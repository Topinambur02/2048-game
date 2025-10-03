import { useEffect, useRef, useState } from "react";
import { OptionsType } from "../types/OptionsType";
import { Audio, AVPlaybackSource } from "expo-av";

export const useAudio = (soundSource: AVPlaybackSource, options: OptionsType) => {
    const [volume, setVolume] = useState(0.5)
    const sound = useRef<Audio.Sound | null>(null)

    useEffect(() => {
        let isMounted = true

        const playMusic = async () => {
            try {
                const optionsWithVolume = { ...options, volume: volume }
                const { sound: soundObject } = await Audio.Sound.createAsync(soundSource, optionsWithVolume)

                if (isMounted) {
                    sound.current = soundObject
                }
            } catch (error) {
                console.log('Ошибка воспроизведения:', error)
            }
        }

        playMusic()

        return () => {
            isMounted = false
            if (sound.current) sound.current.unloadAsync()
        }
    }, [soundSource, options.shouldPlay, options.isLooping])

    useEffect(() => {
        const updateVolume = async () => {
            if (sound.current) {
                try {
                    await sound.current.setVolumeAsync(volume)
                } catch (error) {
                    console.log('Ошибка изменения громкости:', error)
                }
            }
        };

        updateVolume()
    }, [volume])

    return {
        volume,
        setVolume
    }
}