import React, { useState } from 'react'

import { width } from './Board'

export default function Items (props) {
  const candyArr = props.colorArr
  const [draggedItem, setDraggedItem] = useState(null)
  const [replacedItem, setReplacedItem] = useState(null)

  function handleOnDragStart (e) {
    setDraggedItem(e.target)
  }

  function handleOnDrop (e) {
    setReplacedItem(e.target)
  }

  function handleOnDragEnd (e) {
    e.preventDefault()

    console.log(document.getElementById('0'))

    const itemDraggedId = parseInt(draggedItem.getAttribute('id'))
    const itemReplacedId = parseInt(replacedItem.getAttribute('id'))

    const validMoves = [
      itemDraggedId - width,
      itemDraggedId + width
    ]
    const potentialValidMoves = [
      itemDraggedId - 1,
      itemDraggedId + 1
    ]
    if (itemDraggedId + 1 % width !== 0 && itemDraggedId % width !== 0) {
      validMoves.push(...potentialValidMoves)
    }
    const validMove = validMoves.includes(itemReplacedId)

    if (validMove) {
      colorArr[itemReplacedId] = draggedItem.getAttribute('src')
      colorArr[itemDraggedId] = replacedItem.getAttribute('src')

      const isARowOfFour = checkforRowFour()
      const isAColOfFour = checkforColFour()
      const isARowOfThree = checkforRowThree()
      const isAColOfThree = checkforColThree()

      if (itemReplacedId && (isARowOfFour || isAColOfFour || isARowOfThree || isAColOfThree)) {
        setDraggedItem(null)
        setReplacedItem(null)
      } else {
        colorArr[itemReplacedId] = replacedItem.getAttribute('src')
        colorArr[itemDraggedId] = draggedItem.getAttribute('src')
        setColorArr([...colorArr])
      }
    }
  }

  return (
    <>
      {candyArr.map((rows, x) => {
        return rows.map((candy, y) => {
          return <img
            className={'grid-item'} key={`${x}-${y}`}
            src={candy}
            alt={candy}
            data-id={`${x}-${y}`}
            draggable='true'
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={ handleOnDrop }
            onDragStart={ handleOnDragStart }
            onDragEnd={ handleOnDragEnd }
          />
        })
      })}
    </>
  )
}
