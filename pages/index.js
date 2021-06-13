import Image from 'next/image';
import Header from "../components/header";

function Home() {

    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/about/", name: "About"}
      ];

    return  (
        <main className="overflow-scroll">
            <Header menuLinks={menuLinks} selectedTab={null}/>
            <Image src="/bg1.jpg" layout="fill" objectFit="cover"/>
            <div className="fixed top-1/2 w-full flex flex-col justify-center items-center text-center">
                <div className="md:text-5xl text-xl text-white font-serif w-full">
                    <div className="transition duration-500 linear delay-0 transform">Developer</div>
                </div>
            </div>
        </main>
    )
}

export default Home