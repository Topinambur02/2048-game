import { BOARD_SIZE } from "../constants/constants"

export const getEmptyCells = (board: number[][]): [number, number][] => {
    const emptyCells: [number, number][] = []

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                emptyCells.push([i, j])
            }
        }
    }
    
    return emptyCells
}