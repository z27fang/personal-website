import { useEffect, useState } from 'react';

export default function BlogProgress() {
    const [scrollPct, setScrollPct] = useState(0);

    useEffect(() => {
        window.onscroll = (e) => {
            let curHeight = document.documentElement.scrollTop;
            let totalHeight = document.body.scrollHeight - screen.height;
            setScrollPct(curHeight/totalHeight * 100)
        };
    }, [])

    return (
        <div className="sticky left-0 top-0 h-2 bg-gray-300 w-screen">
            <div className="sticky left-0 h-2 bg-gray-700 z-10"
            style={{
                width: `${scrollPct}%`
            }}/>
        </div>
    )
}