import { useEffect } from "react";
import { OptionsType } from "../types/OptionsType";
import { Audio, AVPlaybackSource } from "expo-av";

export const useAudio = (soundSource: AVPlaybackSource, options: OptionsType) => {
    useEffect(() => {
        let sound: Audio.Sound

        const playMusic = async () => {
            try {
                const { sound: soundObject } = await Audio.Sound.createAsync(soundSource, options)
                sound = soundObject
            } catch (error) {
                console.log('Ошибка воспроизведения:', error)
            }
        }

        playMusic()

        return () => {
            if (sound) {
                sound.unloadAsync()
            }
        }
    }, [soundSource, options.shouldPlay, options.isLooping])
}