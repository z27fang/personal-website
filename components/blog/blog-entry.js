import { useState } from 'react';
import Link from 'next/link';
import styles from './blog-entry.module.css';

export default function BlogEntry({ blog }){
    const {
        title,
        date,
        slug,
        author,
        excerpt,
        coverImage
    } = blog;

    const [showExcerpt, setShowExcerpt] = useState(false)

    const onMouseEnter = () => {
        setShowExcerpt(true)
    }

    const onMouseLeave = () => {
        setShowExcerpt(false)
    }

    return (
        <div className="group md:w-1/4 w-full bg-white cursor-pointer m-4 h-48 rounded-lg overflow-hidden
        hover:shadow-lg
        hover:scale-110 transform transition duration-200"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
                <div>
                    <div className="bg-gray-500 flex justify-center h-32">
                        {
                            showExcerpt ?
                            <div className={`h-full ${showExcerpt ? styles['fade-in'] : styles['fade-out']} `}>{excerpt}</div> :
                            <img className={`h-full ${showExcerpt ? styles['fade-out'] : styles['fade-in']}`} src={coverImage}/>
                        }
                    </div>
                    <div className="bg-blue-200 border-t-2 border-black p-2 h-16">
                        <p className="font-serif text-md
                        font-medium
                        border-transparent">{title}</p>
                        <p className="italic text-xs my-1">{date+" " + author.name}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}