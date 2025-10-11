import { createEmptyBoard } from "@/assets/utils/createEmptyBoard";

describe('createEmptyBoard', () => {
    test('create empty board', () => {
        const expected = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        const result = createEmptyBoard()

        expect(result).toStrictEqual(expected)
    })
})