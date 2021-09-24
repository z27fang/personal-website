import React from 'react'
import PropTypes from 'prop-types'

export default function WorkContainer ({ jobInfo }) {
  const { companyName, jobTitle, jobTime, jobDescription } = jobInfo

  return (
    <div className="md:w-9/12 w-11/12 bg-white bg-opacity-20 flex flex-row my-4 h-40 p-1.5 shadow-md transform transition hover:scale-110 duration-200">
      <div className="h-full md:w-48 flex justify-center w-0">
        <img className="h-full" alt="react-icon" src="/assets/react.svg.png" />
      </div>
      <div className="md:w-48 flex justify-center items-center ml-4 w-1/3">
        <p className="font-bold font-serif">{companyName}</p>
      </div>
      <div className="flex flex-col ml-4 md:overflow-hidden overflow-y-scroll w-2/3">
        <p className="font-Bold md:text-xl text-sm">{jobTitle}</p>
        <div className="my-1 md:text-sm text-xs italic">{jobTime}</div>
        {jobDescription.map((duty) => (
          <div key={duty} className="md:text-base text-xs">
            {duty}
          </div>
        ))}
      </div>
    </div>
  )
}
WorkContainer.propTypes = {
  jobInfo: PropTypes.any
}
