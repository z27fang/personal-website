import { getAllBlogs } from '../../lib/api';
import Header from '../../components/header';
import Image from 'next/image';

export default function Blog({ allPosts }){
    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/gallary/", name: "Gallary" },
        { href: "/about/", name: "About"}
      ];
    console.log(allPosts);
    return (
        <div>
            <Image src="/bg3.jpg"
            layout="fill"
            objectFit="cover"/>
            <Header menuLinks={menuLinks} selectedTab="/blog/"/>
        </div>
    )
}


export async function getStaticProps() {
    const allPosts = getAllBlogs([
        "title",
        "date",
        "slug",
        "category",
        "author",
        "excerpt"
    ]);
    return {
        props: { allPosts }
    }
}