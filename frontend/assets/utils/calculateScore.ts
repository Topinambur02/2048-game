export const calculateScore = (board: number[][]) => {
    return board.flat().reduce((acc, val) => acc + val, 0)
}
