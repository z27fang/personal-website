import { useState } from 'react';
import Image from 'next/image';
import SearchBox from "../components/searchBox/search-box";
import DraggableDropdown from "../components/draggable-dropdown/draggable-dropdown";
import Header from "../components/header";

function Home() {

    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/gallary/", name: "Gallary" },
        { href: "/about/", name: "About"}
      ];

    const [showSearch, setShowSearch] = useState(false)

    return  (
        <main className="overflow-scroll">
            <Header menuLinks={menuLinks} selectedTab={null}/>
            <Image src="/bg1.jpg" layout="fill" objectFit="cover"/>
            <div className="fixed top-1/2 w-full flex flex-col justify-center items-center text-center">
                <div className="md:text-5xl text-xl text-white font-serif w-full" 
                onMouseOver={() => setShowSearch(true)}>
                    <div className={ "transition duration-500 linear delay-0 transform "+ 
                    (showSearch ?
                         "-translate-y-full" :
                         "translate-y-0"
                    )}>Developer & Photographer</div>
                </div>
                {
                    showSearch &&
                    <div className="md:text-3xl text-xl md:w-96 w-1/2 md:h-14 h-6">
                        <SearchBox/>
                    </div>
                }
            </div>
            <DraggableDropdown 
            className="fixed top-1/3 z-20"
            itemWidth="10rem"
            itemHeight="2rem"
            headerBG="rgba(255,255,255,0.7)"
            itemBG="rgba(255,255,255,0.5)"
            contents={['abc', 'def', 'ghi', 'jkl', 'uio', 'asdfa asdf']}/>

        </main>
    )
}

export default Home