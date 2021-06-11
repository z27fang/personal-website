import { getAllBlogs } from '../../lib/api';
import Header from '../../components/header';
import Image from 'next/image';
import BlogContainer from '../../components/blog/blog-container';
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
            <div className="fixed left-0 top-28 right-0 overflow-y-scroll max-h-full mb-24 mt-20">
                {/* <div className="max-w-7xl flex flex-col mx-auto">
                    <Section section="react"/>                   
                    <div className="flex md:flex-row flex-col px-8">
                        {
                            reactBlogs.map(blog => <BlogEntry key={blog.title} blog={blog}/>)
                        } 
                    </div>
                </div> */}
                <BlogContainer section='React' blogs={reactBlogs}/>
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