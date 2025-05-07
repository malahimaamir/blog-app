import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'data/posts')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, slug, date, description, content } = req.body
      const frontmatter = `---
title: "${title}"
date: "${date}"
description: "${description}"
slug: "${slug}"
---\n\n`
      const fileContent = frontmatter + content
      const filePath = path.join(postsDirectory, `${slug}.md`)
      
      await fs.promises.writeFile(filePath, fileContent)
      res.status(200).json({ message: 'Post saved successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error saving post' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { slug } = req.body
      const filePath = path.join(postsDirectory, `${slug}.md`)
      
      await fs.promises.unlink(filePath)
      res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}