import ReactMarkdown from "react-markdown"

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div className="markdown-editor">
      <div className="editor-container">
        <textarea
          className="editor-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Write your markdown here..."
        />
      </div>
      <div className="preview-container">
        <div className="preview-title">Preview</div>
        <div className="markdown-preview">
          <ReactMarkdown>{value || 'Nothing to preview'}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}