import Link from "next/link"
import { format } from "date-fns"

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <time dateTime={post.date} className="post-date">
          {format(new Date(post.date), "MMMM d, yyyy")}
        </time>
      </div>
      <h2 className="post-title">
        <Link href={`/posts/${post.slug}`} className="post-title-link">
          {post.title}
        </Link>
      </h2>
      <p className="post-excerpt">{post.description}</p>
      <Link href={`/posts/${post.slug}`} className="read-more">
        Read More →
      </Link>
    </article>
  )
}

