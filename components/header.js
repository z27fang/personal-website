import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

function MenuLink ({ selectedTab, href, children }) {
  const className = selectedTab === (href + '/') || selectedTab === href
    ? 'py-2 text-white md:py-0 md:text-2xl text-lg border-white border-b-4'
    : 'py-2 text-white md:py-0 md:text-2xl text-lg border-opacity-0 border-white border-b-4 hover:border-opacity-100 transition ease-linear duration-300'
  return (
    <div className="px-8 cursor-pointer">
        <Link
        href={href || ''}>
            <p className={className}>
                { children }
            </p>
        </Link>
    </div>)
}
MenuLink.propTypes = {
  selectedTab: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.any
}

export default function Header ({ menuLinks, selectedTab }) {
  const [showMenu, setShowMenu] = useState(false)
  selectedTab = selectedTab || null

  return (
        <header className="md:pt-8 pt-0 md:h-auto h-10 z-20 right-0 left-0 top-0 fixed transition-all ease-in-out box-border bg-gray-400
        bg-opacity-20 backdrop-filter backdrop-blur">
            <div className="max-w-7xl flex items-center mx-auto box-border justify-between">
                <MenuLink href="/" selectedTab={null}>Home</MenuLink>
                <div className="hidden md:flex">
                    <div className="opacity-80 z-10 shadow-none flex flex-row p-0 static items-center inset-x-0 top-0 box-border ">
                        {menuLinks.map((menulink, index) => (
                        <MenuLink href={menulink.href} key={index} selectedTab={selectedTab}>
                            {menulink.name}
                        </MenuLink>
                        ))}
                    </div>
                </div>

                <div
                className="flex pr-4 z-10 md:hidden"
                onClick={() => setShowMenu((prev) => !prev)}
                >
                    <svg
                        className="w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={showMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
                        />
                    </svg>
                </div>
            </div>

            <div className="flex md:hidden">
                <div
                className={
                    'fixed top-0 flex flex-col pt-16 h-auto w-full text-left bg-opacity-80 transition duration-500 linear delay-0 transform ' +
                    (showMenu
                      ? 'translate-y-0 shadow-2xl opacity-1'
                      : '-translate-y-full opacity-0')
                }
                style={{
                  backgroundColor: 'rgb(44, 95, 125)'
                }}
                >
                {menuLinks.map((menulink, id) => (
                    <MenuLink key={id} href={menulink.href} selectedTab={selectedTab}>
                        {menulink.name}
                    </MenuLink>
                ))}
                </div>
            </div>
        </header>
  )
}
Header.propTypes = {
  menuLinks: PropTypes.any,
  selectedTab: PropTypes.string
}
