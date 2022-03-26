import { width, candyColors } from '../Board'
import blank from '../images/blank.png'

function finalCheck(colorCheck, checkArray, colorArr) {
  if (Object.values(checkArray).every(item => item === colorCheck)) {
    Object.keys(checkArray).forEach(item => {
      const coords = item.split(',').map(Number)
      colorArr[coords[0]][coords[1]] = blank
    })
  }
} 

export function checkforColFour (colorArr) {
  for (let i = 0; i < width - 3; i++) {
    for (let j = 0; j < width; j++) {
      const colOfFour = {
        [`${i}, ${j}`]: colorArr[i][j],
        [`${i + 1}, ${j}`]: colorArr[i + 1][j],
        [`${i + 2}, ${j}`]: colorArr[i + 2][j],
        [`${i + 3}, ${j}`]: colorArr[i + 3][j]
      }
      const colorCheck = colorArr[i][j]
      finalCheck(colorCheck, colOfFour, colorArr)
      }
    }
  }

export function checkforColThree (colorArr) {
  for (let i = 0; i < width - 2; i++) {
    for (let j = 0; j < width; j++) {
    const colOfThree = {
      [`${i}, ${j}`]: colorArr[i][j],
      [`${i + 1}, ${j}`]: colorArr[i + 1][j],
      [`${i + 2}, ${j}`]: colorArr[i + 2][j]
    }
    const colorCheck = colorArr[i][j]
    finalCheck(colorCheck, colOfThree, colorArr)
    }
  }
}

export function checkforRowFour (colorArr) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width - 3; j++) {
      const rowOfFour = {
        [`${i}, ${j}`]: colorArr[i][j],
        [`${i}, ${j + 1}`]: colorArr[i][j + 1],
        [`${i}, ${j + 2}`]: colorArr[i][j + 2],
        [`${i}, ${j + 3}`]: colorArr[i][j + 3]
      }
      const colorCheck = colorArr[i][j]
      finalCheck(colorCheck, rowOfFour, colorArr)
    }
  }
}

export function checkforRowThree (colorArr) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width - 2; j++) {
      const rowOfThree = {
        [`${i}, ${j}`]: colorArr[i][j],
        [`${i}, ${j + 1}`]: colorArr[i][j + 1],
        [`${i}, ${j + 2}`]: colorArr[i][j + 2]
      }
      const colorCheck = colorArr[i][j]
      finalCheck(colorCheck, rowOfThree, colorArr)
     }
  }
}

// export function newItemsToEmptySpace (colorArr) {
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
