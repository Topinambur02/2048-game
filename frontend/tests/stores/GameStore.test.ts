import GameStore from '@/assets/stores/GameStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import $host from '@/assets/http'
import { runInAction } from 'mobx'

const mockedHost = $host as jest.Mocked<typeof $host>

jest.mock('@/assets/http', () => ({
    __esModule: true,
    default: {
        patch: jest.fn(),
    },
}))

describe('GameStore', () => {
    beforeEach(async () => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
        AsyncStorage.clear()
    })

    describe('constructor', () => {
        test('should initialize with default values', () => {
            const store = new GameStore()

            expect(store.score).toBe(0)
            expect(store.isLoading).toBe(true)
        })
    })

    describe('setScore', () => {
        test('should update score and bestScore when new score is higher', async () => {
            await AsyncStorage.setItem('bestScore', '50')
            await AsyncStorage.getItem('bestScore')

            const store = new GameStore()
            await store.initializeStore()

            const newScore = 100

            await store.setScore(100)

            expect(store.score).toBe(newScore)
            expect(store.bestScore).toBe(newScore)
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('bestScore', '100')
        })

        test('should not update bestScore when new score is lower', async () => {
            await AsyncStorage.setItem('bestScore', '100')
            await AsyncStorage.getItem('bestScore')

            const store = new GameStore()

            await store.initializeStore()
            await store.setScore(50)

            expect(store.score).toBe(50)
            expect(store.bestScore).toBe(100)
            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1)
        })
    })

    describe('resetScore', () => {
        test('should reset score to 0', () => {
            const store = new GameStore()

            runInAction(() => {
                store.score = 100
            })

            store.resetScore()

            expect(store.score).toBe(0)
        })
    })

    describe('loadBestScore', () => {
        test('should load best score from AsyncStorage', async () => {
            await AsyncStorage.setItem('bestScore', '150')
            await AsyncStorage.getItem('bestScore')

            const store = new GameStore()

            await (store as any).loadBestScore()

            expect(store.bestScore).toBe(150)
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('bestScore')
        })

        test('should handle invalid stored value', async () => {
            await AsyncStorage.getItem('bestScore')

            const store = new GameStore()

            await (store as any).loadBestScore()

            expect(store.bestScore).toBe(0)
        })

        test('should handle missing value', async () => {
            await AsyncStorage.getItem('bestScore')

            const store = new GameStore()

            await (store as any).loadBestScore()

            expect(store.bestScore).toBe(0)
        })
    })

    describe('updateBestScore', () => {
        test('should update bestScore and save to AsyncStorage', async () => {
            const store = new GameStore()
            const newBestScore = 200

            await AsyncStorage.setItem('bestScore', '0')

            await (store as any).updateBestScore(newBestScore)

            expect(store.bestScore).toBe(newBestScore)
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('bestScore', '200')
        })
    })

    describe('sendCurrentScoreToServer', () => {
        test('should send bestScore to server', async () => {
            const store = new GameStore()
            runInAction(() => {
                store.bestScore = 300
            })

            mockedHost.patch.mockResolvedValueOnce({} as any)

            await store.sendCurrentScoreToServer()

            expect(mockedHost.patch).toHaveBeenCalledWith(
                '/users/me',
                { bestScore: 300 },
                { headers: { 'Content-Type': 'application/json' } }
            )
        })

        test('should handle server error gracefully', async () => {
            const store = new GameStore()
            runInAction(() => {
                store.bestScore = 300
            })

            mockedHost.patch.mockRejectedValueOnce(new Error('Network error'))

            await expect(store.sendCurrentScoreToServer()).resolves.toBeUndefined()
        })
    })

    describe('initializeStore', () => {
        test('should initialize store successfully', async () => {
            await AsyncStorage.setItem('bestScore', '100')
            await AsyncStorage.getItem('bestScore')

            const store = new GameStore()

            await store.initializeStore()

            expect(store.bestScore).toBe(100)
            expect(store.isLoading).toBe(false)
        })
    })
})
