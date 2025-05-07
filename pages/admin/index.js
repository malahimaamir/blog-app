import { getSortedPostsData } from "../../lib/posts";
import Link from "next/link";
import Layout from "../../components/Layout";

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      posts: allPostsData,
    },
  };
}

export default function AdminIndex({ posts }) {
  const handleDelete = async (slug) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await fetch("/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });
      window.location.reload();
    }
  };

  return (
    <Layout>
      <h1>Admin - Posts</h1>
      <Link href="/admin/new">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/admin/new?slug=${post.slug}`}>Edit</Link>
            <button onClick={() => handleDelete(post.slug)}>Delete</button>
            {post.title}
          </li>
        ))}
      </ul>
    </Layout>







  );
}
