import React, { useState } from 'react'

function SearchBtn (props) {
  return (
        <svg className="w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2} d="m495,466.1l-119.2-119.2c29.1-35.5 46.5-80.8 46.5-130.3 0-113.5-92.1-205.6-205.6-205.6-113.6,0-205.7,92.1-205.7,205.7s92.1,205.7 205.7,205.7c49.4,0 94.8-17.4 130.3-46.5l119.1,119.1c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9zm-443.2-249.4c-1.42109e-14-91 73.8-164.8 164.8-164.8 91,0 164.8,73.8 164.8,164.8s-73.8,164.8-164.8,164.8c-91,0-164.8-73.8-164.8-164.8z"/>
        </svg>
  )
}

export default function SearchBox () {
  const [inputText, setInputText] = useState('')

  return (
        <div className="flex justify-between h-full w-full text-white">
            <input
            className="w-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
            type="text" value={inputText}
            onChange={(e) => setInputText(e.target.value)} />
            <div className="flex p-2 z-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.5' }}>
                <SearchBtn/>
            </div>
        </div>
  )
}
