import { getAllBlogs } from '../../lib/api';

export default function Blog({ allPosts }){
    console.log(allPosts);
    return (
        <div></div>
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