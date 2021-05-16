import ImageNavigator from "../components/imageNavigator/image-navigator";

function Home() {

    const menuLinks = [
        { href: "/", name: "Home" },
        { href: "/blog/", name: "Blog" },
        { href: "/introduction/", name: "Introduction" },
        { href: "/investment/", name: "Investment" }
      ];


    return  (
        <main>
            <div className="w-full h-full">
                <ImageNavigator
                images={['/bg1.jpg', '/bg2.jpg', 'bg3.jpg']}/>
            </div>
        </main>
    )
}

export default Home