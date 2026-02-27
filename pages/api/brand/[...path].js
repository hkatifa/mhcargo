import fs from 'fs'
import path from 'path'

const MIME_TYPES = {
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  pdf: 'application/pdf',
}

export default function handler(req, res) {
  const pathParts = req.query.path
  if (!pathParts) return res.status(404).end()

  const brandDir = path.join(process.cwd(), 'public', 'brand')
  const filePath = path.resolve(brandDir, ...pathParts)

  // Prevent path traversal
  if (!filePath.startsWith(brandDir + path.sep) && filePath !== brandDir) {
    return res.status(403).end('Forbidden')
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).end('Not found')
  }

  const ext = path.extname(filePath).slice(1).toLowerCase()
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream'

  res.setHeader('Content-Type', mimeType)
  res.setHeader('Cache-Control', 'public, max-age=86400')

  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(res)
}
