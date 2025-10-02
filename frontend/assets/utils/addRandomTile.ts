import { getEmptyCells } from "./getEmptyCells"

export const addRandomTile = (currentBoard: number[][]) => {
    const emptyCells = getEmptyCells(currentBoard)

    if (emptyCells.length === 0) return currentBoard

    const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const newBoard = currentBoard.map(row => [...row])

    newBoard[x][y] = Math.random() < 0.9 ? 2 : 4

    return newBoard
}