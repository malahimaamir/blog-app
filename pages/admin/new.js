import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getPostData } from '../../lib/posts'
import MarkdownEditor from '../../components/MarkdownEditor'
import Layout from '../../components/Layout'
import { format } from 'date-fns'

export async function getServerSideProps(context) {
  if (context.query.slug) {
    const postData = await getPostData(context.query.slug)
    return {
      props: {
        postData
      }
    }
  }
  return {
    props: {}
  }
}

export default function NewPost({ postData }) {
  const router = useRouter()
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: postData?.title || '',
      slug: postData?.slug || '',
      date: postData?.date || format(new Date(), 'yyyy-MM-dd'),
      description: postData?.description || '',
      content: postData?.content || ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content = watch('content')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        router.push('/admin')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <h1>{postData ? 'Edit Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register('title', { required: true })} />
        </div>
        
        <div>
          <label>Slug</label>
          <input {...register('slug', { required: true })} />
        </div>
        
        <div>
          <label>Date</label>
          <input type="date" {...register('date', { required: true })} />
        </div>
        
        <div>
          <label>Description</label>
          <textarea {...register('description', { required: true })} />
        </div>
        
        <div>
          <label>Content</label>
          <MarkdownEditor 
            value={content} 
            onChange={(value) => setValue('content', value)} 
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </Layout>
  )
}