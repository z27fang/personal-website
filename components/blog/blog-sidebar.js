import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

function BlogItemSmall ({ children, className }) {
  return (
  <div className={`bg-gray-500 w-12 h-12 border-b-2 border-black ${className}`}>
    {children}
  </div>
  )
}
BlogItemSmall.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
}

function BlogItemBase ({ children, className }) {
  return (
  <div className={`bg-gray-500 w-44 h-12 border-b-2 border-black ${className}`}>
    <div className="p-4 transform transition hover:scale-110 cursor-pointer duration-100">
      {children}
    </div>
  </div>
  )
}
BlogItemBase.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
}

export default function BlogSidebar ({ allPosts }) {
  const [showFull, setShowFull] = useState(true)

  const sidebarOnClick = () => {
    setShowFull(!showFull)
  }

  return (
  <div className={`fixed w-44 h-full bg-gray-700 top-2 transform duration-100
    ${showFull ? 'translate-x-0' : '-translate-x-32'} `}
    onClick={sidebarOnClick}>
      <div className={`flex flex-col max-h-full ${showFull ? 'items-start' : 'items-end'}`}>
        <div>
          {
            showFull
              ? <BlogItemBase><Link href="/"><p className="bold">Home</p></Link></BlogItemBase>
              : <BlogItemSmall>
                  <img src="/assets/home.png"
                  className="w-full h-full p-4"
                  alt="home" />
                </BlogItemSmall>
          }
        </div>
        <div>
          {
            showFull
              ? <BlogItemBase><Link href="/blog/"><p className="bold">Blogs</p></Link></BlogItemBase>
              : <BlogItemSmall>
                  <img src="/assets/blog.png"
                  className="w-full h-full p-4"
                  alt="blog"/>
                </BlogItemSmall>
          }
        </div>
        <div>
          {
            showFull
              ? <BlogItemBase><Link href="/about/"><p className="bold">About</p></Link></BlogItemBase>
              : <BlogItemSmall>
                  <img src="/assets/about.png"
                    className="w-full h-full p-4"
                    alt="about"/>
                </BlogItemSmall>
          }
        </div>
      </div>
    </div>
  )
}
BlogSidebar.propTypes = {
  allPosts: PropTypes.object
}
