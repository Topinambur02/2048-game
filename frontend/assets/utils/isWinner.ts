import { WIN_NUMBER } from "../constants/constants"

export const isWinner = (board: number[][]) => {
    return board.some(row => row.includes(WIN_NUMBER))
}