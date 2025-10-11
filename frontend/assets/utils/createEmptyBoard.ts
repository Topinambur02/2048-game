import { BOARD_SIZE } from '../constants/constants'

export const createEmptyBoard = (): number[][] =>
    Array(BOARD_SIZE)
        .fill(0)
        .map(() => Array(BOARD_SIZE).fill(0))
