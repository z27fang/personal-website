import { getAllBlogs } from '../../lib/api';
import Header from '../../components/header';
import Image from 'next/image';
import BlogContainer from '../../components/blog/blog-container';
export default function Blog({ allPosts }){
    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/about/", name: "About"}
      ];
 
    const reactBlogs = allPosts.filter(post => post.category === 'react');
    const babelBlogs = allPosts.filter(post => post.category === 'JS Dev');
    return (
        <div>
            <Image src="/bg3.jpg"
            layout="fill"
            objectFit="cover"/>
            <Header menuLinks={menuLinks} selectedTab="/blog/"/>
            <div className="fixed left-0 top-28 right-0 overflow-y-scroll max-h-full mb-24 mt-4">
                <div className="flex flex-col">
                    <BlogContainer section='React' blogs={reactBlogs}/>
                    <BlogContainer section='JS Dev' blogs={babelBlogs}/>
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
        "excerpt",
        "coverImage"
    ]);
    return {
        props: { allPosts }
    }
}