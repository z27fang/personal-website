import { useRouter } from 'next/router';

export default function PostPage({ post }) {

    const router = useRouter();

    if (!router.isFallback && !post){
        return (
            <div> ERROR </div>
        )
    }

    return (
        <div>
            {post}
        </div>
    )
}