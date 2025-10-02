import { BOARD_SIZE } from "../constants/constants"

export const processLine = (line: number[]) => {
    const filtered = line.filter(cell => cell !== 0)
    const result: number[] = []
    let i = 0

    while (i < filtered.length) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            result.push(filtered[i] * 2)
            i += 2
        } else {
            result.push(filtered[i])
            i += 1
        }
    }

    return [...result, ...Array(BOARD_SIZE - result.length).fill(0)]
}