import { width, candyColors } from '../Board'

export default function createBoard () {
  const newArr = new Array(width).fill(0).map(() => new Array(width).fill(0))
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      newArr[i][j] = candyColors[Math.floor(Math.random() * candyColors.length)]
    }
  }
  return newArr
}
