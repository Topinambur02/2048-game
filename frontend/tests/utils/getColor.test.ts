import { getColor } from '@/assets/utils/getColor'

describe('getColor', () => {
    test('get color for 2', () => {
        const expected = '#EDE4DA'
        const result = getColor(2)

        expect(result).toBe(expected)
    })

    test('get color for 4', () => {
        const expected = '#ECE0C9'
        const result = getColor(4)

        expect(result).toBe(expected)
    })

    test('get color for 8', () => {
        const expected = '#F2B178'
        const result = getColor(8)

        expect(result).toBe(expected)
    })

    test('get color for 16', () => {
        const expected = '#F49663'
        const result = getColor(16)

        expect(result).toBe(expected)
    })

    test('get color for 32', () => {
        const expected = '#F67C5F'
        const result = getColor(32)

        expect(result).toBe(expected)
    })

    test('get color for 64', () => {
        const expected = '#F65E3B'
        const result = getColor(64)

        expect(result).toBe(expected)
    })

    test('get color for 128', () => {
        const expected = '#EDCF73'
        const result = getColor(128)

        expect(result).toBe(expected)
    })

    test('get color for 256', () => {
        const expected = '#EECC62'
        const result = getColor(256)

        expect(result).toBe(expected)
    })

    test('get color for 512', () => {
        const expected = '#EDC851'
        const result = getColor(512)

        expect(result).toBe(expected)
    })

    test('get color for 1024', () => {
        const expected = '#EEC43F'
        const result = getColor(1024)

        expect(result).toBe(expected)
    })

    test('get color for 2048', () => {
        const expected = '#EDC22E'
        const result = getColor(2048)

        expect(result).toBe(expected)
    })

    test('get default color', () => {
        const expected = '#CDC0B4'
        const result = getColor(0)

        expect(result).toBe(expected)
    })
})
