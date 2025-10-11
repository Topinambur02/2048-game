import { calculateScore } from '@/assets/utils/calculateScore'

describe('calculateScore', () => {
    test('calculate score for empty board', () => {
        const board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
        const expected = 0
        const result = calculateScore(board)

        expect(result).toBe(expected)
    })

    test('calculate score for fully filled board', () => {
        const board = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]
        const expected = 45
        const result = calculateScore(board)

        expect(result).toBe(expected)
    })

    test('calculate score for half-filled board', () => {
        const board = [
            [2, 0, 9],
            [1, 3, 0],
            [3, 1, 4],
        ]
        const expected = 23
        const result = calculateScore(board)

        expect(result).toBe(expected)
    })
})
