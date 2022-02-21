import React, { useState, useEffect } from 'react'

import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import purpleCandy from './images/purple-candy.png'
import blank from './images/blank.png'

export default function Board () {
  const [colorArr, setColorArr] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [replacedItem, setReplacedItem] = useState(null)

  const width = 8
  const candyColors = [blueCandy, redCandy, greenCandy, yellowCandy, orangeCandy, purpleCandy]

  // function checkforColFour () {
  //   for (let i = 0; i < (width * (width - 3)); i++) {
  //     const colOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
  //     const colorCheck = colorArr[i]

  //     if (colOfFour.every(item => colorArr[item] === colorCheck)) {
  //       (colOfFour.forEach(item => colorArr[item] = blank))
  //       return true
  //     }
  //   }
  // }

  // function checkforColThree () {
  //   for (let i = 0; i < (width * (width - 2)); i++) {
  //     const colOfThree = [i, i + width, i + (width * 2)]
  //     const colorCheck = colorArr[i]

  //     if (colOfThree.every(item => colorArr[item] === colorCheck)) {
  //       (colOfThree.forEach(item => colorArr[item] = blank))
  //       return true
  //     }
  //   }
  // }

  // function checkforRowFour () {
  //   for (let i = 0; i < (width * width); i++) {
  //     const rowOfFOur = [i, i + 1, i + 2, i + 3]
  //     const colorCheck = colorArr[i]
  //     const skipCheckFour = []
  //     if ((i + 1) % width === 0 || (i + 2) % width === 0 || (i + 3) % width === 0) {
  //       skipCheckFour.push(i)
  //     }
  //     if (skipCheckFour.includes(i) === false) {
  //       if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
  //         (rowOfFOur.forEach(item => colorArr[item] = blank))
  //         return true
  //       }
  //     }
  //   }
  // }

  // function checkforRowThree () {
  //   for (let i = 0; i < (width * width); i++) {
  //     const rowOfThree = [i, i + 1, i + 2]
  //     const colorCheck = colorArr[i]
  //     const skipCheck = []
  //     if ((i + 1) % width === 0 || (i + 2) % width === 0) {
  //       skipCheck.push(i)
  //     }
  //     if (skipCheck.includes(i) === false) {
  //       if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
  //         (rowOfThree.forEach(item => colorArr[item] = blank))
  //         return true
  //       }
  //     }
  //   }
  // }

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

  // function handleOnDragStart (e) {
  //   setDraggedItem(e.target)
  // }

  // function handleOnDrop (e) {
  //   setReplacedItem(e.target)
  // }

  // function handleOnDragEnd (e) {
  //   e.preventDefault()

  //   console.log(document.getElementById('0'))

  //   const itemDraggedId = parseInt(draggedItem.getAttribute('id'))
  //   const itemReplacedId = parseInt(replacedItem.getAttribute('id'))

  //   const validMoves = [
  //     itemDraggedId - width,
  //     itemDraggedId + width
  //   ]
  //   const potentialValidMoves = [
  //     itemDraggedId - 1,
  //     itemDraggedId + 1
  //   ]
  //   if (itemDraggedId + 1 % width !== 0 && itemDraggedId % width !== 0) {
  //     validMoves.push(...potentialValidMoves)
  //   }
  //   const validMove = validMoves.includes(itemReplacedId)

  //   if (validMove) {
  //     colorArr[itemReplacedId] = draggedItem.getAttribute('src')
  //     colorArr[itemDraggedId] = replacedItem.getAttribute('src')

  //     const isARowOfFour = checkforRowFour()
  //     const isAColOfFour = checkforColFour()
  //     const isARowOfThree = checkforRowThree()
  //     const isAColOfThree = checkforColThree()

  //     if (itemReplacedId && (isARowOfFour || isAColOfFour || isARowOfThree || isAColOfThree)) {
  //       setDraggedItem(null)
  //       setReplacedItem(null)
  //     } else {
  //       colorArr[itemReplacedId] = replacedItem.getAttribute('src')
  //       colorArr[itemDraggedId] = draggedItem.getAttribute('src')
  //       setColorArr([...colorArr])
  //     }
  //   }
  // }

  function createBoard () {
    const newArr = new Array(width).fill(0).map(() => new Array(width).fill(0))
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        newArr[i][j] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
    }
    console.log(newArr)
    setColorArr(newArr)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      // checkforRowFour()
      // checkforColFour()
      // checkforRowThree()
      // checkforColThree()
      // newItemsToEmptySpace()
      setColorArr([...colorArr])
    }, 1000)
    return () => clearInterval(timer)
  }, [colorArr])

  return (
    <div className='Board'>
      <div className='game'>
        {colorArr.forEach((rowArray, x) => {
          rowArray.map((candy, y) => {
            console.log(candy)
            return <img key={`${x}, ${y}`}
              src={candy}
              alt={candy}
              id={`${x}, ${y}`}
              draggable='true'
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
            // onDrop={ handleOnDrop }
            // onDragStart={ handleOnDragStart }
            // onDragEnd={ handleOnDragEnd }
            />
          })
        })}
      </div>
    </div>
  )
}
