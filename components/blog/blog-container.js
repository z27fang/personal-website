import React from 'react'
import PropTypes from 'prop-types'
import BlogEntry from './blog-entry'
import Section from './section'

// container placeholder, will be removed if implemented in index
export default function BlogContainer ({ section, blogs }) {
  return (
        <div>
            <div className="max-w-7xl flex flex-col mx-auto">
                <Section section={section}/>
                <div className="flex md:flex-row flex-col px-8">
                    {
                        blogs.map(blog => <BlogEntry key={blog.title} blog={blog}/>)
                    }
                </div>
            </div>
        </div>
  )
}
BlogContainer.propTypes = {
  section: PropTypes.string,
  blogs: PropTypes.any
}
