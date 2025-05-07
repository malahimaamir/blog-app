import Link from 'next/link'
import { format } from 'date-fns'

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2>
      <Link href={`/posts/${post.slug}`}>
  {post.title}
</Link>
      </h2>
      <time dateTime={post.date}>
        {format(new Date(post.date), 'MMMM d, yyyy')}
      </time>
      <p>{post.description}</p>
    </article>
  )
}