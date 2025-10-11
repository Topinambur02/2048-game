import { useAudio } from '@/assets/hooks/useAudio';
import { OptionsType } from '@/assets/types/OptionsType';
import { renderHook, act } from '@testing-library/react';
import { Audio } from 'expo-av';

jest.mock('expo-av', () => ({
    Audio: {
        Sound: {
            createAsync: jest.fn(),
        },
    },
}));

const mockSoundSource = { uri: 'test-sound.mp3' };
const baseOptions: OptionsType = {
    shouldPlay: false,
    isLooping: false
};

const mockSoundObject = {
    unloadAsync: jest.fn(),
    setVolumeAsync: jest.fn(),
    playAsync: jest.fn(),
    pauseAsync: jest.fn(),
    stopAsync: jest.fn(),
};

describe('useAudio', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (Audio.Sound.createAsync as jest.Mock).mockResolvedValue({
            sound: mockSoundObject,
        });
    });

    test('should initialize with default volume and create sound instance', async () => {
        const { result } = renderHook(() =>
            useAudio(mockSoundSource, baseOptions)
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(result.current.volume).toBe(0.5);
        expect(Audio.Sound.createAsync).toHaveBeenCalledWith(mockSoundSource, {
            ...baseOptions,
            volume: 0.5,
        });
    });

    test('should update volume and call setVolumeAsync', async () => {
        const { result } = renderHook(() =>
            useAudio(mockSoundSource, baseOptions)
        );

        await act(async () => {
            await Promise.resolve();
        });

        await act(async () => {
            result.current.setVolume(0.75);
        });

        expect(result.current.volume).toBe(0.75);
        expect(mockSoundObject.setVolumeAsync).toHaveBeenCalledWith(0.75);
    });

    test('should recreate sound when shouldPlay changes', async () => {
        const { rerender } = renderHook(
            ({ options }: { options: OptionsType }) =>
                useAudio(mockSoundSource, options),
            {
                initialProps: { options: baseOptions },
            }
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(Audio.Sound.createAsync).toHaveBeenCalledTimes(1);

        const newOptions = { ...baseOptions, shouldPlay: true };

        await act(async () => {
            rerender({ options: newOptions });
        });

        expect(Audio.Sound.createAsync).toHaveBeenCalledTimes(2);
        expect(Audio.Sound.createAsync).toHaveBeenLastCalledWith(mockSoundSource, {
            ...newOptions,
            volume: 0.5,
        });
    });

    test('should unload sound on unmount', async () => {
        const { unmount } = renderHook(() =>
            useAudio(mockSoundSource, baseOptions)
        );

        await act(async () => {
            await Promise.resolve();
        });

        unmount();

        expect(mockSoundObject.unloadAsync).toHaveBeenCalled();
    });

    test('should handle creation errors', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        (Audio.Sound.createAsync as jest.Mock).mockRejectedValue(
            new Error('Creation error')
        );

        await act(async () => {
            renderHook(() => useAudio(mockSoundSource, baseOptions));
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            'Ошибка воспроизведения:',
            expect.any(Error)
        );
    });

    test('should handle volume update errors', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        mockSoundObject.setVolumeAsync.mockRejectedValueOnce(
            new Error('Volume error')
        );

        const { result } = renderHook(() =>
            useAudio(mockSoundSource, baseOptions)
        );

        await act(async () => {
            await Promise.resolve();
        });

        await act(async () => {
            result.current.setVolume(0.8);
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            'Ошибка изменения громкости:',
            expect.any(Error)
        );
    });

    test('should not set sound if unmounted during initialization', async () => {
        (Audio.Sound.createAsync as jest.Mock).mockImplementation(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return { sound: mockSoundObject };
        });

        const { unmount } = renderHook(() =>
            useAudio(mockSoundSource, baseOptions)
        );

        unmount();

        await act(async () => {
            await Promise.resolve();
        });
    });
});