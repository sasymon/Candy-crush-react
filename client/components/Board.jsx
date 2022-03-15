import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setBoard } from '../actions'

import Items from './Items'

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
  const colorArr = useSelector(state => state.board)
  const dispatch = useDispatch()

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

  function createBoard () {
    const newArr = new Array(width).fill(0).map(() => new Array(width).fill(0))
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        newArr[i][j] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
    }
    return newArr
  }

  useEffect(() => {
    dispatch(setBoard(createBoard()))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      // checkforRowFour()
      // checkforColFour()
      // checkforRowThree()
      // checkforColThree()
      // newItemsToEmptySpace())
    }, 1000)
    return () => clearInterval(timer)
  }, [colorArr])

  return (
    <div className='grid-container'>
      <Items />
    </div>
  )
}
