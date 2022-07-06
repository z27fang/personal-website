import React, { useEffect, useState } from 'react'

export default function BlogProgress () {
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    window.onscroll = (e) => {
      const curHeight = document.documentElement.scrollTop
      const totalHeight = document.body.scrollHeight - screen.height
      const pct = curHeight / totalHeight * 100
      setScrollPct(pct > 100 ? 100 : pct)
    }
  }, [])

  return (
        <div className="sticky left-0 top-0 h-2 bg-gray-300 max-w-full shadow-black-/100">
            <div className="sticky left-0 h-2 bg-gray-700 z-10"
            style={{
              width: `${scrollPct}%`
            }}/>
        </div>
  )
}
