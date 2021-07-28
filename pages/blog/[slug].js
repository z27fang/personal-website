import React from 'react'
import { useRouter } from 'next/router'
import { getAllBlogs, getBlogBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import Article from '../../components/blog/article'
import BlogProgress from '../../components/blog/blog-progress'
import BlogSidebar from '../../components/blog/blog-sidebar'

export default function PostPage ({ blog, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !blog?.slug) {
    return (
            <div> ERROR </div>
    )
  }
  return (
        <>
            <div className="min-h-screen max-w-full">
                <BlogProgress/>
                <BlogSidebar/>
                <main>
                    <div className="flex flex-row">
                        <div className="w-2/12"></div>
                        <div className="container mx-auto px-5 w-8/12">
                            {
                                router.isFallback
                                  ? (
                                <div>Loading...</div>
                                    )
                                  : (
                                <Article content={blog.content}/>
                                    )

                            }
                        </div>
                        <div className="w-2/12"></div>
                    </div>
                </main>
            </div>
        </>
  )
}

export async function getStaticProps ({ params }) {
  const blog = getBlogBySlug(params.slug, [
    'title',
    'date',
    'category',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage'
  ])

  const content = await markdownToHtml(blog.content || '')
  return {
    props: {
      blog: {
        ...blog,
        content
      }
    }

  }
}

/**
 * This function tells next.js which paths will be pre-rendered
 * @returns object
 */
export async function getStaticPaths () {
  const blogs = getAllBlogs(['slug'])
  return {
    paths: blogs.map(blog => {
      return {
        params: {
          slug: blog.slug
        }
      }
    }),
    fallback: false
  }
}
