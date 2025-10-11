import { createContext } from 'react'

export const VolumeContext = createContext({
    volume: 0.5,
    setVolume: (volume: number) => {},
})
