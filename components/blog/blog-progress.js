import { useEffect } from 'react';

export default function BlogProgress() {

    // console.log(window);

    useEffect(() => {
        window.onscroll = (e) => {
            console.log(e)
        }
    }, [])

    return (
        <div className="sticky left-0 top-0 h-2 bg-black w-full">

        </div>
    )
}