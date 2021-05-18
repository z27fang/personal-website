import React, { useState } from 'react';

function SearchBtn(props){
    console.log(props)
    return(
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg"><g stroke-width="2" stroke="#6c6c6c" fill="none"><path d="M11.29 11.71l-4-4"/><circle cx="5" cy="5" r="4"/></g></svg>
    )
}

export default function SearchBox() {
    const [inputText, setInputText] = useState('')

    return (
        <div className="flex flex-row h-full">
            <input className="w-11/12"
            type="text" value={inputText} 
            onChange={(e) => setInputText(e.target.value)} />
            <div className="w-1/12">
                <SearchBtn className="w-full text-white"/>
            </div>

        </div>
    )
}