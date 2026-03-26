import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

function getFiles() {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'))
}

export function getAllPosts() {
  return getFiles()
    .map(fileName => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, fileName), 'utf8'))
      return data
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export function getAllSlugs() {
  return getFiles().map(f => f.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  const [bodyEn, bodyFr] = content.split('\n---fr---\n')
  return {
    ...data,
    body: bodyEn?.trim() || '',
    body_fr: bodyFr?.trim() || null,
  }
}
