import { useRef } from 'react'
import { PanResponder } from 'react-native'

export const useGameGesture = (moveTiles: (direction: 'left' | 'right' | 'up' | 'down') => void) => {
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (_, gestureState) => {
                const { dx, dy } = gestureState
                const absDx = Math.abs(dx)
                const absDy = Math.abs(dy)

                if (Math.max(absDx, absDy) < 20) return

                if (absDx > absDy) {
                    moveTiles(dx > 0 ? 'right' : 'left')
                } else {
                    moveTiles(dy > 0 ? 'down' : 'up')
                }
            },
        })
    ).current

    return panResponder
}
