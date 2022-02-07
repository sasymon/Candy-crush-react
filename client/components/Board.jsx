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

  function checkforColFour () {
    for (let i = 0; i < (width * (width - 3)); i++) {
      const colOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
      const colorCheck = colorArr[i]

      if (colOfFour.every(item => colorArr[item] === colorCheck)) {
        // .map or ForEach?
        (colOfFour.map(item => colorArr[item] = blank))
        return true
      }
    }
  }

  function checkforColThree () {
    for (let i = 0; i < (width * (width - 2)); i++) {
      const colOfThree = [i, i + width, i + (width * 2)]
      const colorCheck = colorArr[i]

      if (colOfThree.every(item => colorArr[item] === colorCheck)) {
        (colOfThree.map(item => colorArr[item] = blank))
        return true
      }
    }
  }

  function checkforRowFour () {
    // console.log((46 + 2) % width)
    for (let i = 0; i < (width * width); i++) {
      const rowOfFOur = [i, i + 1, i + 2, i + 3]
      const colorCheck = colorArr[i]
      const skipCheckFour = []
      if ((i + 1) % width === 0 || (i + 2) % width === 0 || (i + 3) % width === 0) {
        skipCheckFour.push(i)
      }
      if (skipCheckFour.includes(i) === false) {
        if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
          (rowOfFOur.map(item => colorArr[item] = blank))
          return true
        }
      }
    }
  }

  function checkforRowThree () {
    for (let i = 0; i < (width * width); i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const colorCheck = colorArr[i]
      const skipCheck = []
      if ((i + 1) % width === 0 || (i + 2) % width === 0) {
        skipCheck.push(i)
      }
      if (skipCheck.includes(i) === false) {
        if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
          (rowOfThree.map(item => colorArr[item] = blank))
          return true
        }
      }
    }
  }

  function newItemsToEmptySpace () {
    // const firstRow = Array.apply(null, Array(width)).map((x, i) => { return i })
    for (let i = 0; i < width * (width - 1); i++) {
      const firstRow = Array.apply(null, Array(width)).map((x, i) => { return i })
      const checkFirstRow = firstRow.includes(i)

      if (checkFirstRow && colorArr[i] === blank) {
        colorArr[i] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }

      if ((colorArr[i + width] === blank)) {
        colorArr[i + width] = colorArr[i]
        colorArr[i] = blank
      }
    }
  }

  function handleOnDragStart (e) {
    setDraggedItem(e.target)
    // console.log('Dragged item: ', e.target)
    // console.log('Dragged: ', draggedItem)
  }

  function handleOnDrop (e) {
    setReplacedItem(e.target)
    // console.log('Dropped on item: ', e.target)
    // console.log('Replaced: ', replacedItem)
  }

  function handleOnDragEnd (e) {
    e.preventDefault()
    // Getting dataIds of dragged and replaced items
    const itemDraggedId = parseInt(draggedItem.getAttribute('data-id'))
    const itemReplacedId = parseInt(replacedItem.getAttribute('data-id'))
    // console.log(typeof itemReplacedId)
    // console.log(typeof itemDraggedId)
    const validMoves = [
      itemDraggedId - width,
      itemDraggedId - 1,
      itemDraggedId + 1,
      itemDraggedId + width
    ]
    const validMove = validMoves.includes(itemReplacedId)

    colorArr[itemReplacedId] = draggedItem.getAttribute('src')
    colorArr[itemDraggedId] = replacedItem.getAttribute('src')

    // console.log('Dragged ID:', itemDraggedId)
    // console.log('Replaced ID:', itemReplacedId)
    // console.log('Valid moves: ', validMoves)
    // console.log(validMove)

    // const [colorArr, setColorArr] = useState([])
    // const [draggedItem, setDraggedItem] = useState(null)
    // const [replacedItem, setReplacedItem] = useState(null)
    if (validMove) {
      // console.log(validMoves)
      console.log('item:', itemReplacedId)
      const isARowOfFour = checkforRowFour()
      const isAColOfFour = checkforColFour()
      const isARowOfThree = checkforRowThree()
      const isAColOfThree = checkforColThree()

      if (itemReplacedId && (isARowOfFour || isAColOfFour || isARowOfThree || isAColOfThree)) {
      // console.log('if: ', itemReplacedId && validMove && (isARowOfFour || isAColOfFour || isARowOfThree || isAColOfThree))
        setDraggedItem(null)
        setReplacedItem(null)
      } else {
        colorArr[itemReplacedId] = replacedItem.getAttribute('src')
        colorArr[itemDraggedId] = draggedItem.getAttribute('src')
        setColorArr([...colorArr])
      // console.log('else: ')
      }
    }
  }

  function createBoard () {
    const randomColorArr = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArr.push(randomColor)
    }
    setColorArr(randomColorArr)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkforRowFour()
      checkforColFour()
      checkforRowThree()
      checkforColThree()
      newItemsToEmptySpace()
      setColorArr([...colorArr])
    }, 100)
    return () => clearInterval(timer)
  }, [checkforColFour, checkforRowFour, checkforRowThree, checkforColThree, newItemsToEmptySpace, colorArr])

  // checkforColFour, checkforRowFour, checkforRowThree, checkforColThree, dropToEmptySpace, colorArr
  return (
    <div className='Board'>
      <div className='game'>
        {colorArr.map((candyColor, index) => {
          return <img key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable='true'
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={ handleOnDrop }
            onDragStart={ handleOnDragStart }
            onDragEnd={ handleOnDragEnd }
          />
        })}
      </div>
    </div>
  )
}
