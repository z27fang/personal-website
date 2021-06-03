import { getAllBlogs } from '../../lib/api';
import Header from '../../components/header';
import Image from 'next/image';
import Section from '../../components/blog/section';

export default function Blog({ allPosts }){
    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/gallary/", name: "Gallary" },
        { href: "/about/", name: "About"}
      ];
    console.log(allPosts);
    const sections = ['React'];
    const reactBlogs = allPosts.filter(post => post.category === 'react');
    
    return (
        <div>
            <Image src="/bg3.jpg"
            layout="fill"
            objectFit="cover"/>
            <Header menuLinks={menuLinks} selectedTab="/blog/"/>
            <div className="fixed left-0 top-28 right-0">
                <div className="max-w-7xl flex flex-col mx-auto">
                    <Section section="react"/>                    
                </div>
            </div>



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