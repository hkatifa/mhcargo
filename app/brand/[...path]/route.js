import { NextResponse } from 'next/server'
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

export async function GET(request, { params }) {
  const pathParts = await params.path
  if (!pathParts || pathParts.length === 0) {
    return new NextResponse('Not found', { status: 404 })
  }

  const brandDir = path.join(process.cwd(), 'public', 'brand')
  const filePath = path.resolve(brandDir, ...pathParts)

  if (!filePath.startsWith(brandDir + path.sep) && filePath !== brandDir) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ext = path.extname(filePath).slice(1).toLowerCase()
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream'
  const fileBuffer = fs.readFileSync(filePath)

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
