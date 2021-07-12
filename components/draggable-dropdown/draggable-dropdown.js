// import React, { useState, useRef } from 'react'
// import type from './draggable-dropdown.module.css'
// import Draggable from 'react-draggable'
// /**
//  * NOT USED
//  * @param {*} props
//  * @returns
//  */
// export default function DraggableDropdown (props) {
//   const [transformCSS, setTransformCSS] = useState({
//     transform: 'translate(0px, 0px)'
//   })
//   const items = props.contents

//   const itemStyle = {
//     minWidth: props.itemWidth,
//     height: props.itemHeight,
//     minHeight: props.itemHeight
//   }

//   const onDragHandler = (e, d) => {
//     setTransformCSS({
//       transform: `translate(${d.x}px, ${d.y}px)`
//     })
//   }

//   const onResizeHandler = (e, d) => {

//   }

//   const myRef = useRef(null)
//   return (
//         <>
//             <Draggable onDrag={onDragHandler}>
//                 <div
//                 className={props.className + ' ' + type['draggable-list-item']}
//                 style={{
//                   ...itemStyle,
//                   backgroundColor: props.headerBG || 'black'
//                 }}></div>
//             </Draggable>
//             {/** the rest item are the list content */}
//             <div className={props.className}
//             style={{
//               marginTop: props.itemHeight,
//               ...transformCSS
//             }}>
//                 <div className={type['draggable-items-container']}>
//                     {
//                         items.map((item) => (
//                             <div
//                             key={item}
//                             className={type['draggable-list-item']}
//                             style={{
//                               backgroundColor: props.itemBG || 'black',
//                               ...itemStyle
//                             }}>
//                                 {item}
//                             </div>
//                         ))
//                     }
//                 </div>

//                 {/* <Draggable
//                 onDrag={onResizeHandler}>
//                     <span className={type['resize-button']}/>
//                 </Draggable> */}
//             </div>

//         </>
//   )
// }
