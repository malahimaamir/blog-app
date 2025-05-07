import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import PostCard from '../components/PostCard'
import Layout from '../components/Layout'

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>My Blog</title>
      </Head>
      <h1>Latest Posts</h1>
      <div className="posts-container">
        {allPostsData.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  )
}