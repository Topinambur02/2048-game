import { useGame } from '@/assets/hooks/useGame'
import { addRandomTile } from '@/assets/utils/addRandomTile'
import { createEmptyBoard } from '@/assets/utils/createEmptyBoard'
import { processLine } from '@/assets/utils/processLine'
import { renderHook, act } from '@testing-library/react'

jest.mock('@/assets/utils/createEmptyBoard')
jest.mock('@/assets/utils/addRandomTile')
jest.mock('@/assets/utils/processLine')

const mockCreateEmptyBoard = createEmptyBoard as jest.MockedFunction<typeof createEmptyBoard>
const mockAddRandomTile = addRandomTile as jest.MockedFunction<typeof addRandomTile>
const mockProcessLine = processLine as jest.MockedFunction<typeof processLine>

const BOARD_SIZE = 4

describe('useGame', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('initializeBoard', () => {
        test('should initialize board with two tiles', () => {
            const emptyBoard = Array(BOARD_SIZE)
                .fill(0)
                .map(() => Array(BOARD_SIZE).fill(0))
            const boardWithOneTile = [...emptyBoard]
            boardWithOneTile[0][0] = 2
            const boardWithTwoTiles = [...boardWithOneTile]
            boardWithTwoTiles[1][1] = 2

            mockCreateEmptyBoard.mockReturnValue(emptyBoard)
            mockAddRandomTile.mockReturnValueOnce(boardWithOneTile).mockReturnValueOnce(boardWithTwoTiles)

            const { result } = renderHook(() => useGame())

            act(() => {
                result.current.initializeBoard()
            })

            expect(mockCreateEmptyBoard).toHaveBeenCalled()
            expect(mockAddRandomTile).toHaveBeenCalledTimes(2)
            expect(result.current.board).toEqual(boardWithTwoTiles)
        })
    })

    describe('moveTiles', () => {
        test('should move tiles left and add new tile', () => {
            const initialBoard = [
                [2, 0, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
            const finalBoard = [
                [4, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]

            mockCreateEmptyBoard.mockReturnValue(initialBoard)
            mockAddRandomTile.mockReturnValue(initialBoard)

            const { result } = renderHook(() => useGame())

            act(() => {
                result.current.initializeBoard()
            })

            mockAddRandomTile.mockClear()
            mockProcessLine.mockReturnValue([2, 0, 0, 0])
            mockAddRandomTile.mockReturnValue(finalBoard)

            act(() => {
                result.current.moveTiles('left')
            })

            expect(mockProcessLine).toHaveBeenCalledTimes(BOARD_SIZE)
            expect(result.current.board).toEqual(finalBoard)
        })

        test('should move tiles right with reversal', () => {
            const initialBoard = [
                [0, 0, 0, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]

            mockCreateEmptyBoard.mockReturnValue(initialBoard)
            mockAddRandomTile.mockReturnValue(initialBoard)

            const { result } = renderHook(() => useGame())

            act(() => {
                result.current.initializeBoard()
            })

            mockProcessLine.mockClear()
            mockProcessLine.mockReturnValue([2, 0, 0, 0])

            act(() => {
                result.current.moveTiles('right')
            })

            expect(mockProcessLine).toHaveBeenCalledWith([2, 0, 0, 0])
        })

        test('should move tiles up vertically', () => {
            const initialBoard = [
                [0, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]

            mockCreateEmptyBoard.mockReturnValue(initialBoard)
            mockAddRandomTile.mockReturnValue(initialBoard)

            const { result } = renderHook(() => useGame())

            act(() => {
                result.current.initializeBoard()
            })

            mockProcessLine.mockClear()
            mockProcessLine.mockReturnValue([2, 0, 0, 0])

            act(() => {
                result.current.moveTiles('up')
            })

            expect(mockProcessLine).toHaveBeenCalledWith([2, 0, 0, 0])
        })

        test('should not add new tile when no movement occurred', () => {
            const initialBoard = [
                [2, 4, 8, 16],
                [4, 8, 16, 32],
                [8, 16, 32, 64],
                [16, 32, 64, 128],
            ]

            mockCreateEmptyBoard.mockReturnValue(initialBoard)
            mockAddRandomTile.mockReturnValue(initialBoard)

            const { result } = renderHook(() => useGame())

            act(() => {
                result.current.initializeBoard()
            })

            mockAddRandomTile.mockClear()
            mockProcessLine.mockClear()
            mockProcessLine.mockImplementation((line) => line)

            act(() => {
                result.current.moveTiles('left')
            })

            expect(mockAddRandomTile).not.toHaveBeenCalled()
            expect(result.current.board).toEqual(initialBoard)
        })
    })
})
