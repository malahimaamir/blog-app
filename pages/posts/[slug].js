import { getPostData, getAllPostSlugs } from '../../lib/posts'
import Layout from '../../components/Layout'

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <time dateTime={postData.date}>
          {new Date(postData.date).toLocaleDateString()}
        </time>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}