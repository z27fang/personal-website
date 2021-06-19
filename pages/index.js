import Image from 'next/image';
import Header from "../components/header";

function Description({ children, className }){
    return (
        <div className={className || "mt-2 text-lg"}>{children}</div>
    )
}

function Home() {

    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/about/", name: "About"}
      ];

    return  (
        <main>
            <Header menuLinks={menuLinks} selectedTab={null}/>
            <Image src="/assets/bg1.jpg" layout="fill" objectFit="cover"/>
            <div className="fixed top-1/4 w-full flex flex-col justify-center items-center text-center">
                <div className="md:text-5xl text-xl text-white font-serif w-full mx-auto flex flex-col items-center">
                    <div className="flex flex-row items-center justify-center">
                        <img src="/avatar.jpg" alt="avatar" className="w-24 h-24 rounded-full border-2 mx-4"/>
                        <div className="h-20 border-r-2 border-white"/>
                        <div className="ml-4">Zihao Fang</div>
                    </div>
                    <div className="mt-12 bg-gray-600 bg-opacity-40 flex flex-col text-left rounded-md p-4 border-2 border-white">
                        <Description className="text-2xl">Welcome to my website!</Description>
                        <Description>🙍‍♂️  I am a developer with data background.</Description>
                        <Description>🎓  I earned a bachlor's degree with Statistics major and Computer Science Minor at University of Waterloo.</Description>
                        <Description>📚  I am learning Vite, React, ESBuild...(and many other stuff).</Description>
                        <Description>📸  Oh, I also like taking photos, I took this background at Victoria.</Description>
                        <Description>👀  Learn more what I am capable of at 
                            <a href="/about/" className="border-b-2 border-white hover:text-blue-200 hover:border-blue-200"> About</a>
                        </Description>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home