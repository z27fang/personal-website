import ImageNavigator from "../components/imageNavigator/image-navigator";
import Header from "../components/header";

function Home() {

    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/gallary/", name: "Gallary" },
        { href: "/about/", name: "About"}
      ];


    return  (
        <main>
            <Header menuLinks={menuLinks}/>
            <div className="w-full h-full">
                <ImageNavigator
                images={['/bg1.jpg', '/bg2.jpg', 'bg3.jpg']}/>
            </div>
            <div className="fixed top-1/2 w-full">
                <div className="flex justify-center md:text-5xl text-xl text-white font-serif">
                    Developer & Photographer
                </div>
            </div>
        </main>
    )
}

export default Home