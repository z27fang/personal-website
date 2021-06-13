import { useRouter } from 'next/router';
import { getAllBlogs, getBlogBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import { CMS_NAME } from '../../lib/constants';
import Article from '../../components/blog/article';
import BlogProgress from '../../components/blog/blog-progress';

export default function PostPage({ blog, morePosts, preview }) {

    const router = useRouter();
    if (!router.isFallback && !blog?.slug){
        return (
            <div> ERROR </div>
        )
    }
    return (
        <>
            <div className="min-h-scren">
                <BlogProgress/>
                <main>
                    <div className="container mx-auto px-5">
                        {
                            router.isFallback ? ( 
                            <div>Loading...</div>
                            ) : (
                            <Article content={blog.content}/>
                            )

                        }
                    </div>
                </main>
            </div>
        </>
    )
}


export async function getStaticProps({ params }){
    const blog = getBlogBySlug(params.slug, [
        "title",
        "date",
        "category",
        "slug",
        "author",
        "content",
        "ogImage",
        "coverImage"
    ]);

    const content = await markdownToHtml(blog.content || "");
    return {
        props:{
            blog: {
                ...blog,
                content
            }
        } 

    }

}

/**
 * This function tells next.js which paths will be pre-rendered
 * @returns object
 */
export async function getStaticPaths(){
    const blogs = getAllBlogs(["slug"]);
    return {
        paths: blogs.map(blog => {
            return {
                params: {
                    slug: blog.slug
                }
            }
        }),
        fallback: false
    }
}