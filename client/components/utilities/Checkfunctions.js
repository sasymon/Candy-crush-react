// import colorArr from '../Board'

// function checkforColFour () {
//   for (let i = 0; i < (width * (width - 3)); i++) {
//     const colOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
//     const colorCheck = colorArr[i]

//     if (colOfFour.every(item => colorArr[item] === colorCheck)) {
//       // .map or ForEach?
//       (colOfFour.map(item => colorArr[item] = blank))
//       return true
//     }
//   }
// }

// function checkforColThree () {
//   for (let i = 0; i < (width * (width - 2)); i++) {
//     const colOfThree = [i, i + width, i + (width * 2)]
//     const colorCheck = colorArr[i]

//     if (colOfThree.every(item => colorArr[item] === colorCheck)) {
//       (colOfThree.map(item => colorArr[item] = blank))
//       return true
//     }
//   }
// }

// function checkforRowFour () {
//   // console.log((46 + 2) % width)
//   for (let i = 0; i < (width * width); i++) {
//     const rowOfFOur = [i, i + 1, i + 2, i + 3]
//     const colorCheck = colorArr[i]
//     const skipCheckFour = []
//     if ((i + 1) % width === 0 || (i + 2) % width === 0 || (i + 3) % width === 0) {
//       skipCheckFour.push(i)
//     }
//     if (skipCheckFour.includes(i) === false) {
//       if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
//         (rowOfFOur.map(item => colorArr[item] = blank))
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
//         (rowOfThree.map(item => colorArr[item] = blank))
//         return true
//       }
//     }
//   }
// }
