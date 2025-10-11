import { BOARD_SIZE } from '../constants/constants'

export const isGameOver = (board: number[][]) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                return false
            }
        }
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const current = board[i][j]

            if (j < BOARD_SIZE - 1 && board[i][j + 1] === current) {
                return false
            }

            if (i < BOARD_SIZE - 1 && board[i + 1][j] === current) {
                return false
            }
        }
    }

    return true
}
