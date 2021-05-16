import React, { useState } from 'react';
import Image from 'next/image';

export default function ImageNavigator({images}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div>
            <Image 
            src={images[currentIndex]}
            layout="fill"
            objectFit="cover"
            />

        </div>
    )
}