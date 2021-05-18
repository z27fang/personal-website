import { useState } from 'react';
import ImageNavigator from "../components/imageNavigator/image-navigator";
import SearchBox from "../components/searchBox/search-box";
import Header from "../components/header";

function Home() {

    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/gallary/", name: "Gallary" },
        { href: "/about/", name: "About"}
      ];

    const [showSearch, setShowSearch] = useState(false)

    return  (
        <main>
            <Header menuLinks={menuLinks}/>
            <div className="w-full h-full">
                <ImageNavigator
                images={['/bg1.jpg', '/bg2.jpg', 'bg3.jpg']}/>
            </div>
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
                    <div className="text-black md:text-4xl text-xl md:w-96 w-1/2 md:h-16 h-6">
                        <SearchBox/>
                    </div>
                }
            </div>
        </main>
    )
}

export default Home