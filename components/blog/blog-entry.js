import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from './blog-entry.module.css'

import IconWidget from '../icon-widget/icon-widget'

export default function BlogEntry ({ blog }) {
  const {
    title,
    date,
    slug,
    author,
    excerpt,
    coverImage
  } = blog

  const [showExcerpt, setShowExcerpt] = useState(false)

  const onMouseEnter = () => {
    setShowExcerpt(true)
  }

  const onMouseLeave = () => {
    setShowExcerpt(false)
  }

  return (
        <div className="group max-w-md cursor-pointer m-4 h-48 overflow-hidden bg-transparent text-white
        hover:shadow-lg
        hover:scale-110 transform transition duration-200"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
                <div>
                    <div className="bg-gray-500 bg-opacity-40 flex justify-center h-32 overflow-hidden">
                        {
                            showExcerpt
                              ? <p className={`h-full ${showExcerpt ? styles['fade-in'] : styles['fade-out']} p-2 text-sm font-mono`}>{excerpt}</p>
                              : <div className={`max-h-full flex items-center ${showExcerpt ? styles['fade-out'] : styles['fade-in']}`}>
                                  <IconWidget icons={coverImage.split(',')}/>
                                </div>
                        }
                    </div>
                    <div className="bg-black bg-opacity-40 p-2 h-16">
                        <p className="font-serif text-md
                        font-medium
                        border-transparent">{title}</p>
                        <p className="italic text-xs my-1">{date + ' ' + author.name}</p>
                    </div>
                </div>
            </Link>
        </div>
  )
}

BlogEntry.propTypes = {
  blog: PropTypes.any
}
