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
    <div className='p-1'>
        <div className={`text-white cursor-pointer select-none p-1
         ${tagContext.checked ? ' bg-green-300 bg-opacity-50' : 'hover:bg-green-100 hover:bg-opacity-10'}`}
         style={{ whiteSpace: 'nowrap' }}
         onClick={handleOnClick}>
            {tagContext.name}
        </div>
    </div>
  )
}

const checkUpwards = (node, tagsArr) => {
  if (node.parent !== -1) {
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
      let tagsArr = [];
      tags.forEach(tag => {
        let base = tagsArr.length;
        let tagsToBeAppended = [];
        buildArrayFromMap(tag, -1, tagsToBeAppended);
        console.log(tagsToBeAppended);
        tagsToBeAppended.forEach(t => {
          if(t.parent !== -1) t.parent += base;
          t.self += base;
          t.children = t.children.map(i => i + base);
        })
        tagsArr = tagsArr.concat(tagsToBeAppended);
      })
      
      let checkedTagsIdx = [];
      tagsArr.forEach((tag, i) => { 
        tag.checked = defaultSelectedTags.includes(tag.name);
        if(tag.checked) checkedTagsIdx.push(i);
      });
      checkedTagsIdx.forEach(i => {
        performCheck(i, tagsArr);
      });
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
        <div className="max-w-7xl mx-auto bg-transparent -mt-10 px-16 py-4 flex flex-wrap">
              {
                  flattenedTags.map(tag => {
                    return <Tag key={tag.name}
                      tagContext={tag}
                      selectNode={selectNode}
                      deselectNode={deselectNode}/>
                  })
              }
        </div>

  )
}
