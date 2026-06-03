import { Resend } from 'resend'

const TO = ['contact@mhcargo.ma', 'sales@mhcargo.ma']
const FROM = 'MH Cargo <notifications@mhcargo.ma>'

// Field order + human label per form type. Only fields listed here are
// included in the email body; everything else in the payload is ignored.
const FIELD_LABELS = {
  quote: {
    'Full-Name': 'Full Name',
    Email: 'Email',
    Phone: 'Phone',
    Direction: 'Direction',
    'Transport-Mode': 'Transport Mode',
    Departure: 'Departure',
    Delivery: 'Delivery',
    'Goods-Type': 'Type of Goods',
    Weight: 'Weight (kg)',
    Volume: 'Volume (m³)',
    Incoterms: 'Incoterms',
  },
  contact: {
    name: 'Name',
    Email: 'Email',
    'Phone-No': 'Phone',
    Message: 'Message',
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function fieldRows(formType, body) {
  const labels = FIELD_LABELS[formType]
  return Object.entries(labels)
    .map(([key, label]) => {
      const value = body[key]
      if (value === undefined || value === null || String(value).trim() === '') return null
      return { label, value: String(value).trim() }
    })
    .filter(Boolean)
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  // Honeypot: real users never fill this. Pretend success, send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true })
  }

  const formType = body.formType
  if (formType !== 'quote' && formType !== 'contact') {
    console.error('[api/quote] invalid formType:', formType)
    return res.status(400).json({ error: 'invalid' })
  }

  // Validation — driven by formType, not by field presence.
  const email = typeof body.Email === 'string' ? body.Email.trim() : ''
  if (!email || !EMAIL_RE.test(email)) {
    console.error(`[api/quote] validation failed (${formType}): missing/invalid Email`)
    return res.status(400).json({ error: 'invalid' })
  }

  if (formType === 'quote') {
    const fullName = typeof body['Full-Name'] === 'string' ? body['Full-Name'].trim() : ''
    if (!fullName) {
      console.error('[api/quote] validation failed (quote): missing Full-Name')
      return res.status(400).json({ error: 'invalid' })
    }
  } else {
    const message = typeof body.Message === 'string' ? body.Message.trim() : ''
    if (!message) {
      console.error('[api/quote] validation failed (contact): missing Message')
      return res.status(400).json({ error: 'invalid' })
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[api/quote] RESEND_API_KEY is not set in the environment')
    return res.status(500).json({ error: 'server_error' })
  }

  const rows = fieldRows(formType, body)
  const senderName =
    formType === 'quote'
      ? String(body['Full-Name']).trim()
      : (typeof body.name === 'string' && body.name.trim()) || email
  const subject =
    formType === 'quote'
      ? `New quote request from ${senderName}`
      : `New contact message from ${senderName}`

  const text = rows.map((r) => `${r.label}: ${r.value}`).join('\n')
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#212C42">
    <h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${rows
        .map(
          (r) =>
            `<tr><td style="padding:4px 16px 4px 0;font-weight:700;vertical-align:top">${escapeHtml(
              r.label
            )}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(r.value)}</td></tr>`
        )
        .join('')}
    </table>
  </div>`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text,
      html,
    })

    if (error) {
      console.error('[api/quote] Resend returned an error:', error)
      return res.status(502).json({ error: 'send_failed' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/quote] Resend threw:', err)
    return res.status(502).json({ error: 'send_failed' })
  }
}
