import { View, Text } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import ScoreBlock from '@/assets/components/ScoreBlock'
import NavigationButton from '@/assets/components/NavigationButton'
import { styles } from '@/assets/styles/GameStyles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import Board from '@/assets/components/Board'
import { useGameGesture } from '@/assets/hooks/useGameGesture'
import { useGame } from '@/assets/hooks/useGame'
import { isWinner } from '@/assets/utils/isWinner'
import WinModal from '@/assets/components/WinModal'
import { isGameOver } from '@/assets/utils/isGameOver'
import LoseModal from '@/assets/components/LoseModal'

const Game = () => {
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const { board, initializeBoard, moveTiles } = useGame()
    const panResponder = useGameGesture(moveTiles)
    const isWin = isWinner(board)
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)

    useEffect(() => {
        if (isWin) {
            setShowWinModal(true)
        }
    }, [isWin])

    useEffect(() => {
        if (!isWin && isGameOver(board)) {
            setShowLoseModal(true)
        }
    }, [board, isWin])

    useFocusEffect(
        useCallback(() => {
            initializeBoard()
            setShowWinModal(false)
            setShowLoseModal(false)
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

            <WinModal
                showWinModal={showWinModal}
                setShowWinModal={setShowWinModal}
                initializeBoard={initializeBoard}
            />

            <LoseModal
                showLoseModal={showLoseModal}
                setShowLoseModal={setShowLoseModal}
                initializeBoard={initializeBoard}
            />
        </View>
    )
}

export default Game