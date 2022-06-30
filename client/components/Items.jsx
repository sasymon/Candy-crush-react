import React, { useState, useEffect } from 'react'

import { width, candyColors } from './Board'
import { checkforColFour, checkforColThree, checkforRowFour, checkforRowThree, checkMovedCandy } from './utilities/Checkfunctions'

export default function Items (props) {
  function handleOnDragStart (e) {
    setDraggedItem(e.target)
  }

  function handleOnDrop (e) {
    setReplacedItem(e.target)
  }

  function handleOnDragEnd (e, copyArr) {
    const workingArr = JSON.parse(JSON.stringify(copyArr))
    e.preventDefault()

    const itemDraggedId = draggedItem.getAttribute('id').split(',').map(Number)
    const itemReplacedId = replacedItem.getAttribute('id').split(',').map(Number)

    const validMoves = []

    // Valid move logic
    // Row 0
    if (itemDraggedId[0] === 0) {
      // Col 0
      if (itemDraggedId[1] === 0) {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )
        // Col 7
      } else if (itemDraggedId[1] === width - 1) {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] - 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )// Col everything else
      } else {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] - 1],
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )
      }
    // Row 7
    } else if (itemDraggedId[0] === width - 1) {
      // Col 0
      if (itemDraggedId[1] === 0) {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] - 1, itemDraggedId[1]]
        )
        // Col 7
      } else if (itemDraggedId[1] === width - 1) {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] - 1],
          [itemDraggedId[0] - 1, itemDraggedId[1]]
        )
        // Col everything else
      } else {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] - 1],
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] - 1, itemDraggedId[1]]
        )
      }
      // Row everything else
    } else {
      // Col 0
      if (itemDraggedId[1] === 0) {
        validMoves.push(
          [itemDraggedId[0] - 1, itemDraggedId[1]],
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )
        // Col 7
      } else if (itemDraggedId[1] === width - 1) {
        validMoves.push(
          [itemDraggedId[0] - 1, itemDraggedId[1]],
          [itemDraggedId[0], itemDraggedId[1] - 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )
        // Col everything else
      } else {
        validMoves.push(
          [itemDraggedId[0] - 1, itemDraggedId[1]],
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]],
          [itemDraggedId[0], itemDraggedId[1] - 1]
        )
      }
    }

    const validMove = validMoves.some(item => item[0] === itemReplacedId[0] && item[1] === itemReplacedId[1])
    if (validMove) {
      workingArr[itemReplacedId[0]][itemReplacedId[1]] = draggedItem.getAttribute('src')
      workingArr[itemDraggedId[0]][itemDraggedId[1]] = replacedItem.getAttribute('src')

      // TODO: Check changed candies only

      // const checkLocal = checkMovedCandy(workingArr, itemDraggedId, itemReplacedId)

      const isAColOfFour = checkforColFour(workingArr)
      const isAColOfThree = checkforColThree(workingArr)
      const isARowOfFour = checkforRowFour(workingArr)
      const isARowOfThree = checkforRowThree(workingArr)

      if (itemReplacedId && (isARowOfFour[0] || isAColOfFour[0] || isARowOfThree[0] || isAColOfThree[0])) {
        setDraggedItem(null)
        setReplacedItem(null)
      } else {
        workingArr[itemReplacedId] = replacedItem.getAttribute('src')
        workingArr[itemDraggedId] = draggedItem.getAttribute('src')
        // console.log('CA2: ', colorArr)
        // setColorArr([...colorArr])
      }
    }
  }

  return (
    <>
      {candyArr.map((rows, x) => {
        return rows.map((candy, y) => {
          return <img
            className={'grid-item'} key={`${x}` + `${y}`}
            src={candy}
            alt={candy}
            id={[`${x}`, `${y}`]}
            draggable='true'
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={ handleOnDrop }
            onDragStart={ handleOnDragStart }
            onDragEnd={(e) => handleOnDragEnd(e, candyArr) }
          />
        })
      })}
    </>
  )
}
