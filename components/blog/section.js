import React from 'react'
import PropTypes from 'prop-types'

export default function Section ({ section }) {
  return (
        <div className="px-12">
            <p className="font-sans text-3xl text-white py-0 my-0">{section}</p>
        </div>
  )
}
Section.propTypes = {
  section: PropTypes.string
}
