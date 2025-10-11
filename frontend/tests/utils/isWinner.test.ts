import { isWinner } from '@/assets/utils/isWinner'

describe('isWinner', () => {
    test('should return true when 2048 is present in any row', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [0, 0, 0, 0],
        ]
        expect(isWinner(board)).toBe(true)
    })

    test('should return false when 2048 is not present in any row', () => {
        const board = [
            [2, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 0, 4096],
            [0, 0, 0, 0],
        ]
        expect(isWinner(board)).toBe(false)
    })

    test('should return true when 2048 appears multiple times', () => {
        const board = [
            [2048, 4, 8, 16],
            [32, 64, 128, 256],
            [512, 1024, 2048, 4096],
            [0, 0, 0, 0],
        ]
        expect(isWinner(board)).toBe(true)
    })

    test('should return false for empty board', () => {
        const board: number[][] = []
        expect(isWinner(board)).toBe(false)
    })

    test('should return false for board with empty rows', () => {
        const board = [[], [], []]
        expect(isWinner(board)).toBe(false)
    })

    test('should return true when 2048 is the only element', () => {
        const board = [[2048]]
        expect(isWinner(board)).toBe(true)
    })

    test('should return false when board contains other numbers but not 2048', () => {
        const board = [
            [2, 4],
            [8, 16],
        ]
        expect(isWinner(board)).toBe(false)
    })
})
