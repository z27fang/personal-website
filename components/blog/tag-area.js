import React, { useMemo, useState, useEffect } from 'react'

function Tag (props) {
  const {
    tagContext,
    selectNode,
    deselectNode
  } = props

  const handleOnClick = () => {
    const checked = tagContext.checked
    if (checked) {
      deselectNode(tagContext)
    } else {
      selectNode(tagContext)
    }
  }

  return (
        <div className={`mx-1 px-1 text-white cursor-pointer
         ${tagContext.checked ? ' bg-blue-300 bg-opacity-80' : ''}`}
         onClick={handleOnClick}>
            {tagContext.name}
        </div>
  )
}

const checkUpwards = (node, tagsArr) => {
  if (node.parent !== -1) {
    // tagsArr[node.parent].checked = true;
    const nodeSiblings = tagsArr[node.parent].children
    let allSibChecked = true
    nodeSiblings.forEach(sib => { allSibChecked = allSibChecked && tagsArr[sib].checked })
    if (allSibChecked) {
      tagsArr[node.parent].checked = true
      checkUpwards(tagsArr[node.parent], tagsArr)
    };
  };
}

const checkDownwards = (node, tagsArr) => {
  if (node.children) {
    node.children.forEach(child => {
      if (!tagsArr[child].checked) {
        tagsArr[child].checked = true
        checkDownwards(tagsArr[child], tagsArr)
      };
    })
  };
}

const deCheckUpwards = (node, tagsArr) => {
  if (node.parent !== -1) {
    tagsArr[node.parent].checked = false
    deCheckUpwards(tagsArr[node.parent], tagsArr)
  };
}

const deCheckDownwards = (node, tagsArr) => {
  if (node.children) {
    node.children.forEach(child => {
      tagsArr[child].checked = false
      deCheckDownwards(tagsArr[child], tagsArr)
    })
  };
}

const buildArrayFromMap = (tag, parentIdx, curArr) => {
  let cCount = 0
  curArr.push({
    name: tag.name,
    parent: parentIdx,
    self: curArr.length,
    children: []
  })
  const tagIdx = curArr.length - 1
  if (tag.children) {
    tag.children.forEach(child => {
      cCount += 1
      curArr[tagIdx].children.push(tagIdx + cCount)
      cCount += buildArrayFromMap(child, tagIdx, curArr)
    })
  }

  return cCount
}
/**
 * A tree-based tag selecting system
 *  the default behaviour of the tree is:
 *   - once all children are selected, the parent becomes selected
 *   - once the parent is deselected, all children are deselected
 * @param {Object} defaultSelectedTags
 * @param {Object} tags tree like object
 * [{
 *     name: string,
 *     children: [tags] || None
 * }] || None
 * @param {Boolean} includeAll whether or not include the 'All' selector
 * @returns
 */
export default function TagArea (props) {
  const {
    defaultSelectedTags,
    tags,
    onChange
  } = props
  /**
     * Perform the initial check
     * @param {*} i
     * @param {*} tagsArr
     */
  const performCheck = (i, tagsArr) => {
    const tag = tagsArr[i]
    if (tag.children) {
      tag.children.forEach(childIdx => {
        if (tag.checked) {
          tagsArr[childIdx].checked = true
        }
        performCheck(childIdx, tagsArr)
      })
    }
  }

  const initialFlattenedTags = useMemo(
    () => {
      const tagsArr = []
      buildArrayFromMap(tags[0], -1, tagsArr)
      tagsArr.forEach(tag => { tag.checked = defaultSelectedTags.includes(tag.name) })
      performCheck(0, tagsArr)
      return tagsArr
    },
    [tags])

  const [flattenedTags, setFlattenedTags] = useState(initialFlattenedTags)

  useEffect(() => {
    if (onChange) {
      const selectedTags = flattenedTags.filter(tag => tag.checked).map(tag => tag.name)
      onChange(selectedTags)
    }
  }, [flattenedTags])

  /**
     *
     * @param {*} node
     *      a node object which includes:
     *     {
     *          name: string,
     *          parent: int,
     *          children: int,
     *          checked: boolean
     *      }
     */
  const selectNode = (node) => {
    const flattenedTagsCopy = JSON.parse(JSON.stringify(flattenedTags))
    flattenedTagsCopy[node.self].checked = true
    checkUpwards(node, flattenedTagsCopy)
    checkDownwards(node, flattenedTagsCopy)
    setFlattenedTags(flattenedTagsCopy)
  }

  const deselectNode = (node) => {
    const flattenedTagsCopy = JSON.parse(JSON.stringify(flattenedTags))
    flattenedTagsCopy[node.self].checked = false
    deCheckUpwards(node, flattenedTagsCopy)
    deCheckDownwards(node, flattenedTagsCopy)
    setFlattenedTags(flattenedTagsCopy)
  }

  return (
        <div className="max-w-7xl mx-auto h-30 bg-transparent -mt-10 px-16 py-4">
            <div className="flex md:flex-row flex-col">
                {
                    flattenedTags.map(tag => {
                      return <Tag key={tag.name}
                        tagContext={tag}
                        selectNode={selectNode}
                        deselectNode={deselectNode}/>
                    })
                }
            </div>
        </div>

  )
}
