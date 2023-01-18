import { width, candyColors } from '../Board'
import blank from '../images/blank.png'


// TODO: Combine check functions into one function

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

// function finalCheck(colorCheck, checkArray) {
//   if (Object.values(checkArray).every(item => item === colorCheck)) {
//     return true
//   }
// }

function getCol(colorArr, index) {
  const col = []
  for (let i = 0; i < width; i++) {
    col.push(colorArr[i][index[1]])
  }
  return col
}

// Returns an array of matched coords to explode
export function checkMatchRows (array, match) {
  var results = [[match.x,match.y]];
  // look right
  
  for(let i = match.x+1; i < array[match.y].length; i++) {
    console.log(i);
      if(array[match.y][i] == match.color) {
        results.push([i,match.y]);
      }   
      else {
        break;
      }
  }
  // look left
  for(let i = match.x-1; i >=0; i--) {
    
    if(array[match.y][i] == match.color) {
      results.push([i,match.y]);
    } 
    else {
      break;
    }
  }  
   
  return results;
}


// Returns an array of matched coords to explode
export function checkMatchColumns (array, match) {
  var results = [[match.x,match.y]];
  // look down
  for(let i = match.y+1; i < array.length; i++) {
     
      if(array[i][match.x] == match.color) {
        results.push([match.x,i]);
      }   
      else {
        break;
      }
  }
  // look up
  for(let i = match.y-1; i >=0; i--) {
   
    if(array[i][match.x] == match.color) {
      results.push([match.x,i]);
    } 
    else {
      break;
    }
  }  
   
  return results;
}

export function checkAll (colorArr) {
  // TODO: Run all checks on entire array
}

export function checkMovedCandy (colorArr, dragged, replaced) {
  const draggedRow = colorArr[dragged[0]]
  const draggedCol = getCol(colorArr, dragged)
  const replacedRow = colorArr[replaced[0]]
  const replacedCol = getCol(colorArr, replaced)
  console.log('replaced', colorArr[replaced[0]][replaced[1]])
  
  console.log('DR: ', checkLines(draggedRow, colorArr[dragged[0]][dragged[1]]))
  console.log('DC: ', checkLines(draggedCol, colorArr[dragged[0]][dragged[1]]))
  console.log('RR: ', checkLines(replacedRow, colorArr[replaced[0]][replaced[1]]))
  console.log('RC: ', checkLines(replacedCol, colorArr[replaced[0]][replaced[1]]))
  
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
      if (Object.values(colOfFour).every(item => item === colorCheck))
        return [true, replaceWithBlank(Object.keys(colOfFour), colorArr)]
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
    if (Object.values(colOfThree).every(item => item === colorCheck))
      return [true, replaceWithBlank(Object.keys(colOfThree), colorArr)]
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
      if (Object.values(rowOfFour).every(item => item === colorCheck))
        return [true, replaceWithBlank(Object.keys(rowOfFour), colorArr)]
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
      if (Object.values(rowOfThree).every(item => item === colorCheck))
        return [true, replaceWithBlank(Object.keys(rowOfThree), colorArr)]
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
