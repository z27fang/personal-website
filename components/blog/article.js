import React from 'react'
import PropTypes from 'prop-types'
import markdownStyles from './markdown-styles.module.css'

export default function Article ({ content }) {
  return (
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
  )
}
Article.propTypes = {
  content: PropTypes.any
}
