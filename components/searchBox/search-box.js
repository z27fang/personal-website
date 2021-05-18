import React, { useState } from 'react';

export default function SearchBox() {
    const [inputText, setInputText] = useState('')

    return (
        <div>
            <input type="text" value={inputText} 
            onChange={(e) => setInputText(e.target.value)} />
        </div>
    )
}