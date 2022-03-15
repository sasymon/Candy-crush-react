import { width, candyColors } from '../Board'
import blank from '../images/blank.png'

export function checkforColFour (colorArr) {
  for (let i = 0; i < (width * (width - 3)); i++) {
    const colOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
    const colorCheck = colorArr[i]

    if (colOfFour.every(item => colorArr[item] === colorCheck)) {
      (colOfFour.forEach(item => colorArr[item] = blank))
      return true
    }
  }
}

export function checkforColThree (colorArr) {
  for (let i = 0; i < (width * (width - 2)); i++) {
    const colOfThree = [i, i + width, i + (width * 2)]
    const colorCheck = colorArr[i]

    if (colOfThree.every(item => colorArr[item] === colorCheck)) {
      (colOfThree.forEach(item => colorArr[item] = blank))
      return true
    }
  }
}

export function checkforRowFour (colorArr) {
  for (let i = 0; i < (width * width); i++) {
    const rowOfFOur = [i, i + 1, i + 2, i + 3]
    const colorCheck = colorArr[i]
    const skipCheckFour = []
    if ((i + 1) % width === 0 || (i + 2) % width === 0 || (i + 3) % width === 0) {
      skipCheckFour.push(i)
    }
    if (skipCheckFour.includes(i) === false) {
      if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
        (rowOfFOur.forEach(item => colorArr[item] = blank))
        return true
      }
    }
  }
}

export function checkforRowThree (colorArr) {
  for (let i = 0; i < (width * width); i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const colorCheck = colorArr[i]
    const skipCheck = []
    if ((i + 1) % width === 0 || (i + 2) % width === 0) {
      skipCheck.push(i)
    }
    if (skipCheck.includes(i) === false) {
      if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
        (rowOfThree.forEach(item => colorArr[item] = blank))
        return true
      }
    }
  }
}

export function newItemsToEmptySpace (colorArr) {
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
