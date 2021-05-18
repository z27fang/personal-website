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
            <div className="fixed top-1/2 w-full">
                <div className="flex flex-col justify-center items-center md:text-5xl text-xl text-white font-serif" 
                onMouseOver={() => setShowSearch(true)}>
                    <div className={ "transition duration-500 linear delay-0 transform "+ 
                    (showSearch ?
                         "-translate-y-full" :
                         "translate-y-0"
                    )}>Developer & Photographer</div>
                    {
                        showSearch &&
                        <div className="text-black">
                            <SearchBox/>
                        </div>
                    }
                </div>
            </div>
        </main>
    )
}

export default Home