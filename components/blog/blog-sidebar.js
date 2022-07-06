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
  <div className={`w-40 h-10 my-1 p-1 pl-5 text-gray-500 border-black hover:bg-gray-400 ${className}
   cursor-pointer flex items-center align-center
   rounded-md`}>
      {children}
  </div>
  )
}
BlogItemBase.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
}

export default function BlogSidebar ({ allPosts }) {
  const [showFull] = useState(true)

  return (
  <div className={`fixed w-44 h-full bg-gray-700 transform duration-100
    ${showFull ? 'translate-x-0' : '-translate-x-32'} `}>
      <div className="flex flex-col max-h-full py-4 px-2 items-start">
        <div>
          {
             <BlogItemBase><Link href="/"><p className="bold w-full">Home</p></Link></BlogItemBase>
          }
        </div>
        <div>
          { <BlogItemBase><Link href="/blog/"><p className="bold w-full">Blogs</p></Link></BlogItemBase>
          }
        </div>
        <div>
          { <BlogItemBase><Link href="/about/"><p className="bold w-full">About</p></Link></BlogItemBase>
          }
        </div>
      </div>
    </div>
  )
}
BlogSidebar.propTypes = {
  allPosts: PropTypes.object
}
