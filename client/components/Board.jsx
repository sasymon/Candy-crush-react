import React, { useState, useEffect } from 'react'

export default function Board () {
  const [colorArr, setColorArr] = useState([])

  const width = 8
  const candyColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple']

  function checkforColFour () {
    // const checkMaxI = [22 + width, 22 + (width * 2), 22 + (width * 3)]
    // console.log(checkMaxI)
    for (let i = 0; i < (width * (width - 3)); i++) {
      const colOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
      const colorCheck = colorArr[i]

      if (colOfFour.every(item => colorArr[item] === colorCheck)) {
        (
          colOfFour.map(item => {
            colorArr[item] = ''
          }))
      }
    }
  }

  function checkforColThree () {
    for (let i = 0; i < (width * (width - 2)); i++) {
      const colOfThree = [i, i + width, i + (width * 2)]
      const colorCheck = colorArr[i]

      if (colOfThree.every(item => colorArr[item] === colorCheck)) {
        (
          colOfThree.map(item => {
            colorArr[item] = ''
          })
        )
      }
    }
  }

  function checkforRowFour () {
    console.log((46 + 2) % width)
    for (let i = 0; i < (width * width); i++) {
      const rowOfFOur = [i, i + 1, i + 2, i + 3]
      const colorCheck = colorArr[i]
      const skipCheckFour = []
      if ((i + 1) % width === 0 || (i + 2) % width === 0 || (i + 3) % width === 0) {
        skipCheckFour.push(i)
      }
      if (skipCheckFour.includes(i) === false) {
        if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
          (
            rowOfFOur.map(item => {
              colorArr[item] = ''
            })
          )
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
      // console.log(skipCheck)

      if (skipCheck.includes(i) === false) {
        if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
          (
            rowOfThree.map(item => {
              colorArr[item] = ''
            })
          )
        }
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
      setColorArr([...colorArr])
    }, 5000)
    return () => clearInterval(timer)
  }, [checkforColFour, checkforRowFour, checkforRowThree, checkforColThree, colorArr])

  return (
    <div className='Board'>
      <div className='game'>
        {colorArr.map((candy, index) => {
          return <img key={index} style={{ backgroundColor: candy }} alt={candy}/>
        })}
      </div>
    </div>
  )
}
