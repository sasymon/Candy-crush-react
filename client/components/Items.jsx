import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { width, candyColors } from './Board'
import { checkforColFour, checkforColThree, checkforRowFour, checkforRowThree } from './utilities/Checkfunctions'
import { setBoard } from '../actions'

export default function Items () {
  const dispatch = useDispatch()
  const candyArr = useSelector(state => state.board)
  const [colorArr, setColorArr] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [replacedItem, setReplacedItem] = useState(null)

  useEffect(() => {
    setColorArr(candyArr)
  }, [])

  function handleOnDragStart (e) {
    setDraggedItem(e.target)
  }

  function handleOnDrop (e) {
    setReplacedItem(e.target)
  }

  function handleOnDragEnd (e) {
    e.preventDefault()

    const itemDraggedId = draggedItem.getAttribute('id').split(',').map(Number)
    const itemReplacedId = replacedItem.getAttribute('id').split(',').map(Number)

    const validMoves = []

    // TODO: Finish valid move logic

    if (itemDraggedId[0] === 0) {
      if (itemDraggedId[1] === width - 1) {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] - 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )
      } else if (itemDraggedId[1] === 0) {
        validMoves.push(
          [itemDraggedId[0], itemDraggedId[1] + 1],
          [itemDraggedId[0] + 1, itemDraggedId[1]]
        )
      }
      // if (itemDraggedId[1] !== width - 1) {}
    }

    // validMoves.push(
    //   [itemDraggedId[0] - 1, itemDraggedId[1]],
    //   [itemDraggedId[0] + 1, itemDraggedId[1]],
    //   [itemDraggedId[0], itemDraggedId[1] - 1],
    //   [itemDraggedId[0], itemDraggedId[1] + 1]
    // )
    console.log('legal', validMoves)
    // const validMoves = [
    // [itemDraggedId[0] - 1, itemDraggedId[1]],
    // [itemDraggedId[0] + 1, itemDraggedId[1]]
    // ]

    // const potentialValidMoves = [
    //   [itemDraggedId[0], itemDraggedId[1] - 1],
    //   [itemDraggedId[0] + 1]
    // ]
    // console.log('maybe', validMoves)
    // if (itemDraggedId + 1 % width !== 0 && itemDraggedId % width !== 0) {
    //   validMoves.push(...potentialValidMoves)
    // }
    // const validMove = validMoves.includes(itemReplacedId)

    // if (validMove) {
    //   colorArr[itemReplacedId] = draggedItem.getAttribute('src')
    //   colorArr[itemDraggedId] = replacedItem.getAttribute('src')

    //   const isARowOfFour = checkforRowFour(colorArr)
    //   const isAColOfFour = checkforColFour(colorArr)
    //   const isARowOfThree = checkforRowThree(colorArr)
    //   const isAColOfThree = checkforColThree(colorArr)

    //   if (itemReplacedId && (isARowOfFour || isAColOfFour || isARowOfThree || isAColOfThree)) {
    //     setDraggedItem(null)
    //     setReplacedItem(null)
    //   } else {
    //     colorArr[itemReplacedId] = replacedItem.getAttribute('src')
    //     colorArr[itemDraggedId] = draggedItem.getAttribute('src')
    //     console.log('CA2: ', colorArr)
    //     setColorArr([...colorArr])
    //   }
    // }
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
            onDragEnd={ handleOnDragEnd }
          />
        })
      })}
    </>
  )
}
