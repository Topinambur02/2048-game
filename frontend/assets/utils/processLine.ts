import { BOARD_SIZE } from '../constants/constants'

export const processLine = (line: number[]) => {
    const filtered = line.filter((cell) => cell !== 0)
    const result: number[] = []
    let skipNext = false

    for (let i = 0; i < filtered.length; i++) {
        if (skipNext) {
            skipNext = false
            continue
        }

        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            result.push(filtered[i] * 2)
            skipNext = true
        } else {
            result.push(filtered[i])
        }
    }

    return [...result, ...Array(BOARD_SIZE - result.length).fill(0)]
}
