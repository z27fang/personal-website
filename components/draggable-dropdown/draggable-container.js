import React from "react";

export default function DraggableContainer(props){

    const {
        children,
        onDrag
    } = props


    console.log(props)
    return (
        <div>
            {props.children}
        </div>

    )

}