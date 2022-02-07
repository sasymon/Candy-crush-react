// import React from 'react'

// function checkforRowFour () {
//   for (let i = 0; i < (width * (width - 2)); i++) {
//     const rowOfFOur = [i, i + 1, i + 2, i + 3]
//     const colorCheck = colorArr[i]
//     const skipCheck = []
//     if (i % width === 0) {
//       skipCheck.push(i - 1)
//       skipCheck.push(i - 2)
//       skipCheck.push(i - 3)
//     }
//     if (skipCheck.includes(i)) continue

//     if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
//       return rowOfFOur.map(item => colorArr[item] = blank)
//     }
//   }
// }

// function checkforRowThree () {
//   for (let i = 0; i < (width * (width - 2)); i++) {
//     const rowOfThree = [i, i + 1, i + 2]
//     const colorCheck = colorArr[i]
//     const skipCheck = []
//     if (i % width === 0) {
//       skipCheck.push(i - 1)
//       skipCheck.push(i - 2)
//     }

//     if (skipCheck.includes(i)) continue

//     if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
//       return rowOfThree.map(item => colorArr[item] = blank)
//     }
//   }
// }
