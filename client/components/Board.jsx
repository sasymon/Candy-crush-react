import React, { useEffect, useState } from 'react'

import createBoard from './utilities/CreateBoard'
import { checkMovedCandy, replaceWithBlank, dropCandyToEmpty } from './utilities/Checkfunctions'

import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import purpleCandy from './images/purple-candy.png'
// import blank from './images/blank.png'

export const width = 8
export const candyColors = [blueCandy, redCandy, greenCandy, yellowCandy, orangeCandy, purpleCandy]

// NEXT TODO: setup helper item drag/drop functionality

export default function Board () {
  const [candyArr, setCandyArr] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [replacedItem, setReplacedItem] = useState(null)

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

      if (Object.keys(checkMovedCandy(workingArr, itemDraggedId, itemReplacedId)).length > 0) {
        setCandyArr([...workingArr])
        setTimeout(() => setCandyArr(replaceWithBlank(checkMovedCandy(workingArr, itemDraggedId, itemReplacedId), workingArr)), 100)
        setTimeout(() => setCandyArr(dropCandyToEmpty(workingArr)), 100)
      }
      setDraggedItem(null)
      setReplacedItem(null)
    } else {
      workingArr[itemReplacedId] = replacedItem.getAttribute('src')
      workingArr[itemDraggedId] = draggedItem.getAttribute('src')
      setCandyArr([...workingArr])
    }
  }

  // function newItemsToEmptySpace () {
  //   for (let i = 0; i < width * (width - 1); i++) {
  //     const firstRow = Array.apply(null, Array(width)).map((x, i) => { return i })
  //     const checkFirstRow = firstRow.includes(i)

  //     if (checkFirstRow && colorArr[i] === blank) {
  //       colorArr[i] = candyColors[Math.floor(Math.random() * candyColors.length)]
  //     }

  //     if ((colorArr[i + width] === blank)) {
  //       colorArr[i + width] = colorArr[i]
  //       colorArr[i] = blank
  //     }
  //   }
  // }

  useEffect(() => {
    setCandyArr(createBoard())
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCandyArr(dropCandyToEmpty([...candyArr]))
      // TODO: Frequent match checks
      // setCandyArr([...candyArr])
      // newItemsToEmptySpace())
    }, 500)
    return () => clearInterval(timer)
  }, [candyArr])
  // console.log('CA: ', candyArr)
  return (
    <div className='grid-container'>
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
    </div>
  )
}
