import { useGameGesture } from '@/assets/hooks/useGameGesture';
import { renderHook } from '@testing-library/react';
import { PanResponder } from 'react-native';

jest.mock('react-native', () => ({
    PanResponder: {
        create: jest.fn(config => ({
            panHandlers: {
                onStartShouldSetPanResponder: jest.fn(),
                onMoveShouldSetPanResponder: jest.fn(),
                onPanResponderRelease: config.onPanResponderRelease,
            },
        })),
    },
}));

describe('useGameGesture', () => {
    const mockMoveTiles = jest.fn();
    const mockPanResponderCreate = PanResponder.create as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockPanResponderCreate.mockClear();
    });

    it('should return pan responder with handlers', () => {
        renderHook(() => useGameGesture(mockMoveTiles));

        expect(mockPanResponderCreate).toHaveBeenCalledWith({
            onStartShouldSetPanResponder: expect.any(Function),
            onMoveShouldSetPanResponder: expect.any(Function),
            onPanResponderRelease: expect.any(Function),
        });
    });

    it('should call moveTiles with left for significant left swipe', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: -50, dy: 10 });
        expect(mockMoveTiles).toHaveBeenCalledWith('left');
    });

    it('should call moveTiles with right for significant right swipe', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: 50, dy: 5 });
        expect(mockMoveTiles).toHaveBeenCalledWith('right');
    });

    it('should call moveTiles with up for significant up swipe', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: 5, dy: -50 });
        expect(mockMoveTiles).toHaveBeenCalledWith('up');
    });

    it('should call moveTiles with down for significant down swipe', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: 5, dy: 50 });
        expect(mockMoveTiles).toHaveBeenCalledWith('down');
    });

    it('should ignore small movements below threshold', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: 15, dy: 10 });
        expect(mockMoveTiles).not.toHaveBeenCalled();
    });

    it('should prioritize horizontal movement when both dx and dy are significant', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: 30, dy: 25 });
        expect(mockMoveTiles).toHaveBeenCalledWith('right');
    });

    it('should prioritize vertical movement when dy is significantly larger', () => {
        let onReleaseHandler: any;

        mockPanResponderCreate.mockImplementation((config) => {
            onReleaseHandler = config.onPanResponderRelease;
            return { panHandlers: {} };
        });

        renderHook(() => useGameGesture(mockMoveTiles));

        onReleaseHandler({} as any, { dx: 20, dy: 40 });
        expect(mockMoveTiles).toHaveBeenCalledWith('down');
    });
});