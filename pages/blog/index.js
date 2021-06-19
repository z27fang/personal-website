import { getAllBlogs } from '../../lib/api';
import Header from '../../components/header';
import BlogContainer from '../../components/blog/blog-container';
import {bgWrap, bgImage} from '../pages.module.css';

export default function Blog({ allPosts }){
    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/about", name: "About"}
      ];
 
    const reactBlogs = allPosts.filter(post => post.category === 'react');
    const devBlogs = allPosts.filter(post => post.category === 'JS Dev');
    return (
        <div>
            <div className={bgWrap}>
                <img className={bgImage}
                alt="bg3"
                src="/assets/bg3.jpg"
                quality={100}/>
            </div>
            <Header menuLinks={menuLinks} selectedTab="/blog/"/>
            <div className="mb-24 mt-28">
                <div className="flex flex-col">
                    <BlogContainer section='React' blogs={reactBlogs}/>
                    <BlogContainer section='JS Dev' blogs={devBlogs}/>
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