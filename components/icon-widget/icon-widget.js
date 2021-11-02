import { useMemo } from "react"

/**
 * The component for display icons in a widget style
 *  support at most 4 icons
 * @param {*} param0 
 * @returns 
 */
export default function IconWidget ({ icons }) {

  const getContainerClassName = (nIcons) => {
    if(nIcons == 2){
      return "grid grid-cols-2"
    } else if (nIcons > 2){
      return "grid grid-cols-2 gird-rows-2"
    } else {
      return "grid"
    }
  }

  const getImageClassName = (nIcons) => {
    if (nIcons == 2) {
      return "h-24 w-24"
    } else if (nIcons > 2) {
      return "h-14 -w-14"
    } else {
      return "h-28 w-28"
    }
  }

  const containerClassname = useMemo(() => getContainerClassName(icons.length), []);

  const imgClassname = useMemo(() => getImageClassName(icons.length), []);

	return (
	      <div className={containerClassname}>
          {
            icons.map(icon => 
            <div className="p-2">
              <img className={imgClassname} src={icon}/>
            </div>)
          }
	      </div>
	)
}
      