import { addRandomTile } from '@/assets/utils/addRandomTile'
import { getEmptyCells } from '@/assets/utils/getEmptyCells'

jest.mock('@/assets/utils/getEmptyCells', () => ({
    ...jest.requireActual('@/assets/utils/getEmptyCells'),
    getEmptyCells: jest.fn(),
}))

describe('addRandomTile', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should return the same board if no empty cells', () => {
        const board = [
            [2, 4, 8, 16],
            [4, 8, 16, 32],
            [8, 16, 32, 64],
            [16, 32, 64, 128],
        ]
        ;(getEmptyCells as jest.Mock).mockReturnValue([])

        const result = addRandomTile(board)

        expect(result).toBe(board)
        expect(getEmptyCells).toHaveBeenCalledWith(board)
    })

    test('should add a tile (2) to a random empty cell (90% chance)', () => {
        const board = [
            [0, 2],
            [2, 0],
        ]
        ;(getEmptyCells as jest.Mock).mockReturnValue([
            [0, 0],
            [1, 1],
        ])

        const spyRandom = jest.spyOn(Math, 'random').mockReturnValueOnce(0.5).mockReturnValueOnce(0.8)

        const result = addRandomTile(board)

        expect(result).toEqual([
            [0, 2],
            [2, 2],
        ])
        expect(spyRandom).toHaveBeenCalledTimes(2)
        expect(getEmptyCells).toHaveBeenCalledWith(board)

        spyRandom.mockRestore()
    })

    test('should add a tile (4) to a random empty cell (10% chance)', () => {
        const board = [
            [2, 0],
            [0, 2],
        ]
        ;(getEmptyCells as jest.Mock).mockReturnValue([
            [0, 1],
            [1, 0],
        ])

        const spyRandom = jest.spyOn(Math, 'random').mockReturnValueOnce(0.7).mockReturnValueOnce(0.95)

        const result = addRandomTile(board)

        expect(result).toEqual([
            [2, 0],
            [4, 2],
        ])
        expect(spyRandom).toHaveBeenCalledTimes(2)

        spyRandom.mockRestore()
    })

    test('should not mutate the original board', () => {
        const board = [
            [0, 2],
            [2, 0],
        ]
        ;(getEmptyCells as jest.Mock).mockReturnValue([[0, 0]])

        const result = addRandomTile(board)

        expect(board).toEqual([
            [0, 2],
            [2, 0],
        ])
        expect(result).not.toBe(board)
    })
})
