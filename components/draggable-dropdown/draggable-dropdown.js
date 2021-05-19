import React, { useState, useRef } from "react";
import type from "./draggable-dropdown.module.css";
import Draggable from "react-draggable";
import DraggableContainer from "./draggable-container";
import ReactDOM from 'react-dom';

export default function DraggableDropdown(props) {

    const [isExpended, setIsExpended] = useState(false);
    const [selectedContent, setSelectedContent] = useState("");
    const [transformCSS, setTransformCSS] = useState({
        'transform': 'translate(0px, 0px)'
    })
    // console.log(props);
    // console.log(type['draggable-header'])
    const items = props.contents;
    
    const itemStyle = {
        'minWidth': props.itemWidth,
        'height': props.itemHeight,
        'minHeight': props.itemHeight
    }

    const onDragHandler = (e, d) => {
        // console.log(e);
        setTransformCSS({
            'transform': `translate(${d.x}px, ${d.y}px)`
        })
    }
    
    const myRef = useRef(null);
    return (
        <>
            <Draggable onDrag={onDragHandler}>
                <div 
                className={props.className + ' ' + type['draggable-list-item']}
                style={{
                    ...itemStyle,
                    'backgroundColor': props.headerBG || 'black',
                }}></div>
            </Draggable>
            {/** the rest item are the list content */}
            <div className={props.className + ' ' + type['draggable-items-container']}
            style={{
                "marginTop": props.itemHeight,
                ...transformCSS,
            }}>
            {
                items.map((item) => (
                    <div 
                    key={item} 
                    className={type['draggable-list-item']} 
                    style={{
                        'backgroundColor': props.itemBG || 'black',
                        ...itemStyle
                    }}>
                        {item}
                    </div>
                ))
            }
            </div>
        </>
            // <div className={props.className + ' ' + type['draggable-list']}
            // style={{
            //     width: props.itemWidth,
            //     minWidth: props.itemWidth,
            //     minHeight: props.itemHeight,
            //     backgroundColor: props.itemBG || 'black',
            //     ...containerStyle
            // }}>

            //     {/** list */}
            //     {/** the first item is the header */}




            // </div>
    )

}