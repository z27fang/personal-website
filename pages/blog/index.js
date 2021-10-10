import React, { useMemo, useState } from 'react'
import { getAllBlogs } from '../../lib/api'
import Header from '../../components/header'
import BlogEntry from '../../components/blog/blog-entry'
import TagArea from '../../components/blog/tag-area'
import { bgWrap, bgImage } from '../pages.module.css'

function generateTags (posts) {
  let allTags = []
  posts.forEach(post => {
    allTags = allTags.concat(post.tags.split(','))
  })
  allTags = [...new Set(allTags)]
  // Check if tagB is a child of tagA
  const isChild = (tagA, tagB) => tagB.length > tagA.length && tagB.includes(tagA)

  // Recursively insert tags into tagsMap
  const insertTag = (tag, tagsList) => {
    if (tagsList.length === 0) {
      tagsList.push({
        name: tag,
        children: []
      })
    } else {
      let isChildFlag = false
      tagsList.forEach(existingTag => {
        isChildFlag = isChildFlag || isChild(existingTag.name, tag)
        if (isChildFlag) {
          insertTag(tag, existingTag.children)
        }
      })
      if (!isChildFlag) {
        tagsList.push({
          name: tag,
          children: []
        })
      }
    }
  }

  const finalTags = []
  allTags.forEach(tag => { insertTag(tag, finalTags) })
  return finalTags
}

export default function Blog ({ allPosts }) {
  const menuLinks = [
    { href: '/blog', name: 'Blog' },
    { href: '/about', name: 'About' }
  ]
  const [selectedTags, setSelectedTags] = useState(['js', 'python'])

  const tags = useMemo(() => generateTags(allPosts),
    [allPosts])

  const isPostSelected = (articleTags) => {
    let isSelected = false
    articleTags.forEach(tag => {
      if (!isSelected) isSelected = isSelected || selectedTags.includes(tag)
    })
    return isSelected
  }

  const selectedPosts = useMemo(
    () => allPosts.filter(post => isPostSelected(post.tags.split(','))).map(post => <BlogEntry
      key={post.title}
      blog={post}/>),
    [selectedTags]
  )

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
                <TagArea tags={tags} defaultSelectedTags={selectedTags} onChange={setSelectedTags}/>
                <div className="max-w-7xl justify-between m-auto px-10">

                  {
                   selectedPosts.length === 0
                     ? <div className="flex items-center justify-center h-full">
                    <p className="text-white text-2xl">Have you selected any tags?</p>
                   </div>
                     : <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1">{selectedPosts}</div>
                  }

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
    'coverImage',
    'tags'
  ])
  return {
    props: { allPosts }
  }
}
