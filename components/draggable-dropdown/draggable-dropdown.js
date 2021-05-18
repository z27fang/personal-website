import { useState } from "react";
import type from "./draggable-dropdown.module.css";

export default function DraggableDropdown(props) {

    const [isExpended, setIsExpended] = useState(false);
    const [selectedContent, setSelectedContent] = useState("");
    console.log(props);
    console.log(type['draggable-header'])
    const items = props.contents;
    
    const itemStyle = {
        'minWidth': props.itemWidth,
        'height': props.itemHeight,
        'minHeight': props.itemHeight
    }

    return (
        <div className={props.className + ' ' + type['draggable-list']}
        style={{
            minWidth: props.itemWidth,
            minHeight: props.itemHeight,
            backgroundColor: props.itemBG || 'black'
        }}>

            {/** list */}
            {/** the first item is the header */}
            <div 
            className={type['draggable-list-item']}
            style={{
                ...itemStyle,
                'backgroundColor': props.headerBG || 'black',
                'position': "fixed",
                'top':"inherit",
                'left': "inherit",
                'width': "inherit"
            }}></div>

            {/** the rest item are the list content */}
            <div className={type['draggable-items-container']}
            style={{
                marginTop: props.itemHeight
            }}>
            {
                items.map((item) => (
                    <div 
                    key={item} 
                    className={type['draggable-list-item']} 
                    style={{
                        ...itemStyle
                    }}>
                        {item}
                    </div>
                ))
            }
            </div>

        </div>
    )

}