import { useCallback, useState } from 'react'
import { BOARD_SIZE } from '../constants/constants'
import { createEmptyBoard } from '../utils/createEmptyBoard'
import { addRandomTile } from '../utils/addRandomTile'
import { processLine } from '../utils/processLine'

export const useGame = () => {
    const [board, setBoard] = useState<number[][]>(createEmptyBoard)

    const initializeBoard = useCallback(() => {
        const newBoard = Array(BOARD_SIZE)
            .fill(0)
            .map(() => Array(BOARD_SIZE).fill(0))
        let boardWithTiles = addRandomTile(newBoard)

        boardWithTiles = addRandomTile(boardWithTiles)

        setBoard(boardWithTiles)
    }, [])

    const moveTiles = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row])
            let moved = false

            if (direction === 'left') {
                for (let i = 0; i < BOARD_SIZE; i++) {
                    const original = [...newBoard[i]]
                    newBoard[i] = processLine(newBoard[i])
                    if (!moved) {
                        moved = JSON.stringify(original) !== JSON.stringify(newBoard[i])
                    }
                }
            } else if (direction === 'right') {
                for (let i = 0; i < BOARD_SIZE; i++) {
                    const original = [...newBoard[i]]
                    newBoard[i] = processLine([...newBoard[i]].reverse()).reverse()
                    if (!moved) {
                        moved = JSON.stringify(original) !== JSON.stringify(newBoard[i])
                    }
                }
            } else if (direction === 'up') {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    const column = newBoard.map((row) => row[j])
                    const original = [...column]
                    const processed = processLine(column)
                    if (!moved) {
                        moved = JSON.stringify(original) !== JSON.stringify(processed)
                    }
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        newBoard[i][j] = processed[i]
                    }
                }
            } else if (direction === 'down') {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    const column = newBoard.map((row) => row[j])
                    const original = [...column]
                    const processed = processLine([...column].reverse()).reverse()
                    if (!moved) {
                        moved = JSON.stringify(original) !== JSON.stringify(processed)
                    }
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        newBoard[i][j] = processed[i]
                    }
                }
            }

            if (moved) {
                return addRandomTile(newBoard)
            }

            return prevBoard
        })
    }, [])

    return {
        board,
        initializeBoard,
        moveTiles,
    }
}
