import { width, candyColors } from '../Board'
import blank from '../images/blank.png'

function getCol (colorArr, index) {
  const col = []
  for (let i = 0; i < width; i++) {
    col.push(colorArr[i][index])
  }
  return col
}

export function checkAll (colorArr) {
  const results = {}
  for (let i = 0; i <= width - 1; i++) {
    for (let j = 0; j <= width - 1; j++) {
      const row = colorArr[i]
      const col = getCol(colorArr, [j])
      const color = colorArr[i][j]
      const coords = [i, j]
      checkLines(row, color, coords)
      // console.log(checkLines(row, color, coords))
      // console.log(row, color, coords)
      if (checkLines(row, color, coords) !== false) {
        results[`row${i}` + j] = checkLines(row, color, coords)
      }
      if (checkLines(col, color, coords) !== false) {
        results[`col${i}` + j] = checkLines(col, color, coords)
      }
    }
  }
  return results
}

export function checkMovedCandy (colorArr, dragged, replaced) {
  const draggedRow = colorArr[dragged[0]]
  const draggedCol = getCol(colorArr, dragged[1])
  const replacedRow = colorArr[replaced[0]]
  const replacedCol = getCol(colorArr, replaced[1])

  // checkedLines(line, color, coords)
  const checkedDraggedRow = checkLines(draggedRow, colorArr[dragged[0]][dragged[1]], dragged)
  const checkedDraggedCol = checkLines(draggedCol, colorArr[dragged[0]][dragged[1]], dragged)
  const checkedReplacedRow = checkLines(replacedRow, colorArr[replaced[0]][replaced[1]], replaced)
  const checkedReplacedCol = checkLines(replacedCol, colorArr[replaced[0]][replaced[1]], replaced)

  const results = {
    col1: checkedDraggedCol,
    col2: checkedReplacedCol,
    row1: checkedDraggedRow,
    row2: checkedReplacedRow
  }
  console.log(checkAll(colorArr))
  Object.keys(results).forEach(element => { if (results[element] === false) { delete results[element] } })

  return results
}

export function replaceWithBlank (matchedInfo, colorArr) {
  Object.keys(matchedInfo).forEach(type => {
    if (type.includes('col')) {
      const col = matchedInfo[type][1][1]
      matchedInfo[type][0].forEach(row => {
        colorArr[row][col] = blank
      })
    }
  })
  Object.keys(matchedInfo).forEach(type => {
    if (type.includes('row')) {
      const row = matchedInfo[type][1][0]
      matchedInfo[type][0].forEach(col => {
        colorArr[row][col] = blank
      })
    }
  })
  return colorArr
}

function checkLines (line, color, coords) {
  return checkForSeven(line, color, coords) !== false ? checkForSeven(line, color, coords)
    : checkForSix(line, color, coords) !== false ? checkForSix(line, color, coords)
      : checkForFive(line, color, coords) !== false ? checkForFive(line, color, coords)
        : checkForFour(line, color, coords) !== false ? checkForFour(line, color, coords)
          : checkForThree(line, color, coords) !== false ? checkForThree(line, color, coords)
            : false
}

function checkForThree (line, color, coords) {
  for (let i = 0; i < line.length - 2; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return [Object.keys(checkLine), coords]
    }
  }
  return false
}

function checkForFour (line, color, coords) {
  for (let i = 0; i < line.length - 3; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2],
      [`${i + 3}`]: line[i + 3]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return [Object.keys(checkLine), coords]
    }
  }
  return false
}

function checkForFive (line, color, coords) {
  for (let i = 0; i < line.length - 4; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2],
      [`${i + 3}`]: line[i + 3],
      [`${i + 4}`]: line[i + 4]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return [Object.keys(checkLine), coords]
    }
  }
  return false
}

function checkForSix (line, color, coords) {
  for (let i = 0; i < line.length - 5; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2],
      [`${i + 3}`]: line[i + 3],
      [`${i + 4}`]: line[i + 4],
      [`${i + 5}`]: line[i + 5]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return [Object.keys(checkLine), coords]
    }
  }
  return false
}

function checkForSeven (line, color, coords) {
  if (Object.values(line).every(item => item === color)) {
    return [[0, 1, 2, 3, 4, 5, 6, 7], coords]
  }
  return false
}

export function dropCandyToEmpty (candyArray) {
  for (let i = 0; i < width - 1; i++) {
    for (let j = 0; j < width; j++) {
      if (i === 0 && candyArray[i][j] === blank) {
        candyArray[i][j] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
      if (candyArray[i + 1][j] === blank) {
        candyArray[i + 1][j] = candyArray[i][j]
        candyArray[i][j] = blank
      }
    }
  }
  return candyArray
}
