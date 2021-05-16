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
        </main>
    )
}

export default Home