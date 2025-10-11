import { processLine } from "@/assets/utils/processLine";

describe('processLine', () => {
    test('should handle empty line', () => {
        expect(processLine([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
    });

    test('should handle line with zeros between numbers', () => {
        expect(processLine([2, 0, 2, 4])).toEqual([4, 4, 0, 0]);
    });

    test('should merge adjacent equals and shift', () => {
        expect(processLine([2, 2, 4, 4])).toEqual([4, 8, 0, 0]);
    });

    test('should handle single element', () => {
        expect(processLine([2, 0, 0, 0])).toEqual([2, 0, 0, 0]);
    });

    test('should handle all equals', () => {
        expect(processLine([2, 2, 2, 2])).toEqual([4, 4, 0, 0]);
    });

    test('should handle three consecutive equals', () => {
        expect(processLine([2, 2, 2, 0])).toEqual([4, 2, 0, 0]);
    });

    test('should not merge after skip', () => {
        expect(processLine([2, 2, 4, 2])).toEqual([4, 4, 2, 0]);
    });

    test('should preserve order of non-merging elements', () => {
        expect(processLine([2, 4, 8, 16])).toEqual([2, 4, 8, 16]);
    });

    test('should handle mixed with zeros', () => {
        expect(processLine([0, 2, 0, 2])).toEqual([4, 0, 0, 0]);
    });

    test('should handle large numbers', () => {
        expect(processLine([4, 4, 8, 8])).toEqual([8, 16, 0, 0]);
    });
});