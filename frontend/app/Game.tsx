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
import { calculateScore } from '@/assets/utils/calculateScore'
import Settings from '@/assets/components/Settings'
import SettingsModal from '@/assets/components/SettingsModal'
import { useStores } from '@/assets/hooks/useStores'

const Game = () => {
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const { board, initializeBoard, moveTiles } = useGame()
    const panResponder = useGameGesture(moveTiles)
    const { gameStore } = useStores()
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const score = calculateScore(board)
    const isWin = isWinner(board)

    useEffect(() => {
        if (isWin) {
            setShowWinModal(true)
        } else if (!isWin && isGameOver(board)) {
            setShowLoseModal(true)
        }
    }, [isWin, board])

    useFocusEffect(
        useCallback(() => {
            initializeBoard()
            gameStore.resetScore()
            setShowWinModal(false)
            setShowLoseModal(false)
        }, [initializeBoard])
    )

    if (gameStore.isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading game data...</Text>
            </View>
        )
    }

    gameStore.setScore(score)

    return (
        <View style={styles.container}>
            <View style={styles.upperBlock}>
                <View style={styles.leftSide}>
                    <View style={styles.blockContainer}>
                        <ScoreBlock text="SCORE" number={gameStore.score} />
                        <ScoreBlock text="BEST" number={gameStore.bestScore} />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <NavigationButton text="MENU" func={() => navigation.goBack()} />
                        <NavigationButton text="LEADERBOARD" func={() => navigation.navigate('Leaderboard')} />
                    </View>
                </View>

                <View style={styles.rightSide}>
                    <Settings onPress={() => setShowSettingsModal(true)} />
                </View>
            </View>

            <Text style={styles.title}>Join the numbers and get to the 2048 tile!</Text>

            <View {...panResponder.panHandlers}>
                <Board board={board} />
            </View>

            <SettingsModal showSettingsModal={showSettingsModal} setShowSettingsModal={setShowSettingsModal} />

            <WinModal
                showWinModal={showWinModal}
                setShowWinModal={setShowWinModal}
                initializeBoard={initializeBoard}
                onClose={() => gameStore.sendCurrentScoreToServer()}
            />

            <LoseModal
                showLoseModal={showLoseModal}
                setShowLoseModal={setShowLoseModal}
                initializeBoard={initializeBoard}
                onClose={() => gameStore.sendCurrentScoreToServer()}
            />
        </View>
    )
}

export default Game
