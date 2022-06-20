import React from 'react'
import PropTypes from 'prop-types'
import markdownStyles from './markdown-styles.module.css'

export default function Article ({ content }) {
  return (
    <div className="md:mx-auto w-full">
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
Article.propTypes = {
  content: PropTypes.any
}
