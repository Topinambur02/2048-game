import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

class GameStore {
    score: number = 0
    bestScore: number = 0
    isLoading: boolean = true
    private error: string | null = null

    async setScore(newScore: number) {
        runInAction(() => this.score = newScore)

        if (newScore > this.bestScore) {
            await this.updateBestScore(newScore)
        }
    }

    constructor() {
        makeAutoObservable(this)
        this.initializeStore()
    }

    public resetScore() {
        this.score = 0
    }

    private async loadBestScore() {
        try {
            const savedBestScore = await AsyncStorage.getItem('bestScore')

            runInAction(() => {
                if (savedBestScore) {
                    const parsedScore = parseInt(savedBestScore, 10)
                    this.bestScore = isNaN(parsedScore) ? 0 : parsedScore
                } else {
                    this.bestScore = 0
                }
            })
        } catch (error) {
            runInAction(() => this.error = 'Failed to load best score')
            throw error
        }
    }

    async initializeStore() {
        try {
            await this.loadBestScore()
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to load game data'
                console.error('Store initialization error:', error)
            })
        } finally {
            runInAction(() => this.isLoading = false)
        }
    }

    private async updateBestScore(newBestScore: number) {
        try {
            runInAction(() => this.bestScore = newBestScore)
            await AsyncStorage.setItem('bestScore', newBestScore.toString())
        } catch (error) {
            runInAction(() => this.error = 'Failed to save best score')
            console.error('Error saving best score:', error)
        }
    }

    async debugStorage() {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const stores = await AsyncStorage.multiGet(keys)
            console.log('AsyncStorage contents:', stores)
        } catch (error) {
            console.error('Debug storage error:', error)
        }
    }
}

export default GameStore