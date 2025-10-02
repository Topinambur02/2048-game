import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import ScoreBlock from '@/assets/components/ScoreBlock'
import NavigationButton from '@/assets/components/NavigationButton'
import { styles } from '@/assets/styles/GameStyles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import Board from '@/assets/components/Board'
import { useGameGesture } from '@/assets/hooks/useGameGesture'
import { useGame } from '@/assets/hooks/useGame'

const Game = () => {
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const { board, initializeBoard, moveTiles } = useGame()
    const panResponder = useGameGesture(moveTiles)

    useFocusEffect(
        useCallback(() => {
            initializeBoard()
        }, [initializeBoard])
    )

    return (
        <View style={styles.container}>
            <View style={styles.upperBlock}>
                <View style={styles.blockContainer}>
                    <ScoreBlock text='SCORE' number={0} />
                    <ScoreBlock text='BEST' number={0} />
                </View>

                <View style={styles.buttonsContainer}>
                    <NavigationButton
                        text='MENU'
                        func={() => navigation.goBack()}
                    />
                    <NavigationButton
                        text='LEADERBOARD'
                        func={() => navigation.navigate('Leaderboard')}
                    />
                </View>
            </View>

            <Text style={styles.title}>Join the numbers and get to the 2048 tile!</Text>

            <View {...panResponder.panHandlers}>
                <Board board={board} />
            </View>
        </View>
    )
}

export default Game