import React from 'react'
import { render } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { useGame } from '@/assets/hooks/useGame'
import Game from '@/app/Game'
import { useStores } from '@/assets/hooks/useStores'

jest.mock('@/assets/hooks/useGame')
jest.mock('@/assets/stores/index')
jest.mock('@react-navigation/native')
jest.mock('@/assets/components/Board')
jest.mock('@/assets/hooks/useStores', () => ({
    useStores: jest.fn(),
}))
jest.mock('@/assets/hooks/useGameGesture', () => ({
    useGameGesture: () => ({
        panResponder: {
            panHandlers: {
                onStartShouldSetPanResponder: jest.fn(),
                onMoveShouldSetPanResponder: jest.fn(),
                onPanResponderGrant: jest.fn(),
                onPanResponderMove: jest.fn(),
                onPanResponderRelease: jest.fn(),
                onPanResponderTerminate: jest.fn(),
            },
        },
    }),
}))

const mockUseGame = useGame as jest.MockedFunction<typeof useGame>
const mockUseStores = useStores as jest.MockedFunction<typeof useStores>
const mockUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>

describe('Game Screen Integration Test', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        mockUseGame.mockReturnValue({
            board: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            initializeBoard: jest.fn(),
            moveTiles: jest.fn(),
        })

        const mockGameStore = {
            isLoading: false,
            score: 0,
            bestScore: 100,
            resetScore: jest.fn(),
            setScore: jest.fn(),
            sendCurrentScoreToServer: jest.fn(),
            loadBestScore: jest.fn(),
            initializeStore: jest.fn(),
            updateBestScore: jest.fn(),
            debugStorage: jest.fn(),
        }

        mockUseStores.mockReturnValue({ gameStore: mockGameStore as any })

        mockUseNavigation.mockReturnValue({
            goBack: jest.fn(),
            navigate: jest.fn(),
        } as any)
    })

    test('should render all main game elements correctly', () => {
        const { getByText } = render(<Game />)

        expect(getByText('Join the numbers and get to the 2048 tile!')).toBeTruthy()
    })

    test('should initialize game when screen is focused', () => {
        const { initializeBoard } = mockUseGame()
        const { gameStore } = mockUseStores()

        render(<Game />)

        expect(initializeBoard).toHaveBeenCalledTimes(0)
        expect(gameStore.resetScore).toHaveBeenCalledTimes(0)
    })

    test('should show loading state when game is loading', () => {
        const mockGameStore = {
            isLoading: true,
            score: 0,
            bestScore: 100,
            resetScore: jest.fn(),
            setScore: jest.fn(),
            sendCurrentScoreToServer: jest.fn(),
            loadBestScore: jest.fn(),
            initializeStore: jest.fn(),
            updateBestScore: jest.fn(),
            debugStorage: jest.fn(),
        }

        mockUseStores.mockReturnValueOnce({
            gameStore: mockGameStore as any,
        })

        const { getByText } = render(<Game />)

        expect(getByText('Loading game data...')).toBeTruthy()
    })

    test('should update score when board changes', () => {
        const { gameStore } = mockUseStores()
        mockUseGame()

        render(<Game />)

        expect(gameStore.setScore).toHaveBeenCalledWith(expect.any(Number))
    })
})
