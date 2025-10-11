import { isGameOver } from "@/assets/utils/isGameOver";

describe('isGameOver', () => {
    test('should return false when there is at least one empty cell (0)', () => {
        const boardWithEmptyCell = [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 0]
        ];
        expect(isGameOver(boardWithEmptyCell)).toBe(false);
    });

    test('should return false when there are horizontal merges available', () => {
        const boardWithHorizontalMerge = [
            [2, 2, 4, 8],
            [4, 8, 16, 32],
            [2, 4, 8, 16],
            [8, 16, 32, 64]
        ];
        expect(isGameOver(boardWithHorizontalMerge)).toBe(false);
    });

    test('should return false when there are vertical merges available', () => {
        const boardWithVerticalMerge = [
            [2, 4, 2, 4],
            [2, 8, 4, 8],
            [4, 16, 8, 16],
            [8, 32, 16, 32]
        ];
        expect(isGameOver(boardWithVerticalMerge)).toBe(false);
    });

    test('should return true when board is full with no possible moves', () => {
        const fullBoardNoMoves = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        expect(isGameOver(fullBoardNoMoves)).toBe(true);
    });

    test('should return true for full board with different values but no merges', () => {
        const fullBoardDifferentValues = [
            [2, 4, 8, 16],
            [16, 8, 4, 2],
            [2, 4, 8, 16],
            [16, 8, 4, 2]
        ];
        expect(isGameOver(fullBoardDifferentValues)).toBe(true);
    });

    test('should return false for completely empty board', () => {
        const emptyBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        expect(isGameOver(emptyBoard)).toBe(false);
    });

    test('should return false when merge possible at right edge', () => {
        const boardWithRightEdgeMerge = [
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 4],
            [2, 4, 2, 2]
        ];
        expect(isGameOver(boardWithRightEdgeMerge)).toBe(false);
    });

    test('should return false when merge possible at bottom edge', () => {
        const boardWithBottomEdgeMerge = [
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 2]
        ];
        expect(isGameOver(boardWithBottomEdgeMerge)).toBe(false);
    });
});