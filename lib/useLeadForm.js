import { useState } from 'react'

// Shared client logic for the lead forms (quote + contact).
// Handles: serializing the form, posting to /api/quote, and exposing a
// submit status that drives the existing .w-form-done / .w-form-fail blocks.
// `status` is one of: 'idle' | 'submitting' | 'success' | 'error'.
export default function useLeadForm(formType) {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data.formType = formType

    setStatus('submitting')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      form.reset()
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  return {
    status,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error',
    handleSubmit,
  }
}
