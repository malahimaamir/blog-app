import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div className="markdown-editor">
      <div className="editor">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your markdown here..."
        />
      </div>
      <div className="preview">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  )
}