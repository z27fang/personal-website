import React from 'react'
import { getAllBlogs } from '../../lib/api'
import Header from '../../components/header'
import BlogContainer from '../../components/blog/blog-container'
import TagArea from '../../components/blog/tag-area'
import { bgWrap, bgImage } from '../pages.module.css'

export default function Blog ({ allPosts }) {
  const menuLinks = [
    { href: '/blog', name: 'Blog' },
    { href: '/about', name: 'About' }
  ]

  const reactBlogs = allPosts.filter(post => post.category === 'react')
  const devBlogs = allPosts.filter(post => post.category === 'JS Dev')

  const tags = [
    {
      name: 'a',
      children: [
        {
          name: 'a-a'
        },
        {
          name: 'a-b',
          children: [
            {
              name: 'a-b-a'
            },
            {
              name: 'a-b-b',
              children: [
                {
                  name: 'a-b-b-a'
                },
                {
                  name: 'a-b-b-b'
                }
              ]
            }
          ]
        },
        {
          name: 'a-c',
          children: [
            {
              name: 'a-c-a'
            },
            {
              name: 'a-c-b'
            }
          ]
        }
      ]
    }
  ]
  return (
        <div>
            <div className={bgWrap}>
                <img className={bgImage}
                alt="bg3"
                src="/assets/bg3.jpg"
                quality={100}/>
            </div>
            <Header menuLinks={menuLinks} selectedTab="/blog/"/>
            <div className="mb-24 mt-28">
                <TagArea tags={tags} defaultSelectedTags={['a-b-b']}/>
                <div className="flex flex-col">
                    <BlogContainer section='React' blogs={reactBlogs}/>
                    <BlogContainer section='JS Dev' blogs={devBlogs}/>
                </div>
            </div>
        </div>
  )
}

export async function getStaticProps () {
  const allPosts = getAllBlogs([
    'title',
    'date',
    'slug',
    'category',
    'author',
    'excerpt',
    'coverImage'
  ])
  return {
    props: { allPosts }
  }
}
