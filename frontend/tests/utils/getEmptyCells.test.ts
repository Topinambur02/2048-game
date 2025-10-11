import { getEmptyCells } from '@/assets/utils/getEmptyCells'

describe('getEmptyCells', () => {
    test('should return all empty cells for completely empty board', () => {
        const board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        const expected = [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 0],
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3],
        ]
        const result = getEmptyCells(board)

        expect(result).toStrictEqual(expected)
    })

    test('should return no empty cells for full board', () => {
        const board = [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
        ]
        const expected: [number, number][] = []
        const result = getEmptyCells(board)

        expect(result).toEqual(expected)
    })
})
