import React, { useState, useEffect } from 'react'

import Items from './Items'

import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import purpleCandy from './images/purple-candy.png'
import blank from './images/blank.png'

export const width = 8

export default function Board () {
  const [colorArr, setColorArr] = useState([])

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

  function createBoard () {
    const newArr = new Array(width).fill(0).map(() => new Array(width).fill(0))
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        newArr[i][j] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
    }
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
    <div className='grid-container'>
      <Items colorArr={colorArr} />
    </div>
  )
}
