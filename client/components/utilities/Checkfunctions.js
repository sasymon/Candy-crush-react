import { width, candyColors } from '../Board'
import blank from '../images/blank.png'


export function replaceWithBlank (matchedCoords, colorArr) {
  matchedCoords.forEach(item => {
    const coords = item.split(',').map(Number)
    colorArr[coords[0]][coords[1]] = blank
  })
  
  return colorArr
}

// Object.keys(checkArray).forEach(item => {
//   const coords = item.split(',').map(Number)
//   colorArr[coords[0]][coords[1]] = blank
// })


function getCol(colorArr, index) {
  const col = []
  for (let i = 0; i < width; i++) {
    col.push(colorArr[i][index[1]])
  }
  return col
}

export function checkAll (colorArr) {
  // TODO: Run all checks on entire array
}

export function checkMovedCandy (colorArr, dragged, replaced) {
  const draggedRow = colorArr[dragged[0]]
  const draggedCol = getCol(colorArr, dragged)
  const replacedRow = colorArr[replaced[0]]
  const replacedCol = getCol(colorArr, replaced)
  // console.log('arguments', dragged, replaced)
  
  console.log('DR: ', checkLines(draggedRow, colorArr[dragged[0]][dragged[1]], dragged))
  console.log('DC: ', checkLines(draggedCol, colorArr[dragged[0]][dragged[1]], dragged))
  console.log('RR: ', checkLines(replacedRow, colorArr[replaced[0]][replaced[1]], replaced))
  console.log('RC: ', checkLines(replacedCol, colorArr[replaced[0]][replaced[1]], replaced))
}

function checkLines (line, color) {
  if( checkForSeven(line, color) == true) {
    return 7
  } else if (checkForSix(line, color) == true) {
    return 6
  } else if (checkForFive(line, color) == true) {
    return 5
  } else if (checkForFour(line, color) == true) {
    return 4
  } else if (checkForThree(line, color) == true) {
    return
  } else {
    return [false]
  }
}

function checkForThree (line, color, coords) {
 for (let i = 0; i < line.length - 3; i++) {
  const checkLine = {
    [`${i}`]: line[i],
    [`${i + 1}`]: line[i + 1],
    [`${i + 2}`]: line[i + 2],
  }
  if (Object.values(checkLine).every(item => item === color)) {
    return true
  }
 }
}

export function checkForFour (line, color) {
  for (let i = 0; i < line.length - 4; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2],
      [`${i + 1}`]: line[i + 3]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return true
    }
   }
  }

export function checkForFive (line, color) {
  for (let i = 0; i < line.length - 5; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2],
      [`${i + 3}`]: line[i + 3],
      [`${i + 4}`]: line[i + 4]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return true
    }
   }
}

export function checkForSix (line, color) {
  for (let i = 0; i < line.length - 6; i++) {
    const checkLine = {
      [`${i}`]: line[i],
      [`${i + 1}`]: line[i + 1],
      [`${i + 2}`]: line[i + 2],
      [`${i + 3}`]: line[i + 3],
      [`${i + 4}`]: line[i + 4],
      [`${i + 5}`]: line[i + 5]
    }
    if (Object.values(checkLine).every(item => item === color)) {
      return true
    }
   }
}

export function checkForSeven (line, color) {
   if (Object.values(line).every(item => item === color)) {
    return true
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
