import React from 'react'
import Link from 'next/link'
import Header from '../components/header'
import { bgImage } from './pages.module.css'

function Description ({ children, className }) {
  return (
        <div className={className || 'mt-2 md:text-lg text-sm'}>{children}</div>
  )
}

function Home () {
  const menuLinks = [
    { href: '/blog', name: 'Blog' },
    { href: '/about', name: 'About' }
  ]

  return (
        <main>
            <Header menuLinks={menuLinks} selectedTab={null}/>
            <img className={bgImage} src="/assets/bg1.jpg" alt="bg1"/>
            <div className="fixed top-1/4 w-full flex flex-col justify-center items-center text-center">
                <div className="md:text-5xl text-xl text-white font-serif w-full mx-auto flex flex-col items-center">
                    <div className="flex flex-row items-center justify-center">
                      <a href="https://github.com/z27fang/personal-website">
                        <img src="/assets/avatar.jpg" alt="avatar" className="w-24 h-24 rounded-full border-2 mx-4"/>
                      </a>
                      <div className="h-20 border-r-2 border-white"/>
                      <div className="ml-4">Zihao Fang 方子豪</div>
                    </div>
                    <div className="mt-12 bg-gray-600 bg-opacity-40 flex flex-col text-left p-4">
                        <Description className="text-2xl">Welcome to my homepage!</Description>
                        <Description>🙍‍♂️  I am a developer with data background.</Description>
                        <Description>🎓  I earned a bachlor&#39;s degree with Statistics major and Computer Science Minor at <b>University of Waterloo</b>.</Description>
                        <Description>🎓  Incoming graduate student at <b>Georgia Tech</b> under OMSA program!</Description>
                        <Description>📚  I am learning <i>Vite, React, ESBuild...(and many other stuff).</i></Description>
                        <Description>📸  Oh, I also like taking photos, I took this background at Victoria.</Description>
                        <Description>👀  Learn more about my experience at
                            <Link href="/about"><a className="border-b-2 border-white hover:text-blue-200 hover:border-blue-200"> About</a></Link>
                        </Description>
                    </div>
                </div>
            </div>
        </main>
  )
}

export default Home
