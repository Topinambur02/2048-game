import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import $host from '../http'

class GameStore {
    score: number = 0
    bestScore: number = 0
    isLoading: boolean = true
    private error: string | null = null

    async setScore(newScore: number) {
        runInAction(() => (this.score = newScore))

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
            runInAction(() => (this.error = 'Failed to load best score'))
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
            runInAction(() => (this.isLoading = false))
        }
    }

    async sendCurrentScoreToServer() {
        try {
            const headers = { headers: { 'Content-Type': 'application/json' } }
            const data = { bestScore: this.bestScore }
            await $host.patch('/users/me', data, headers)
        } catch (error) {
            console.error('Error sending game result to server:', error)
        }
    }

    public async clearAllStorage() {
        try {
            await AsyncStorage.clear();
            runInAction(() => {
                this.bestScore = 0;
                this.score = 0;
                this.error = null;
            });
            console.log('AsyncStorage successfully cleared!');
        } catch (error) {
            runInAction(() => (this.error = 'Failed to clear storage'));
            console.error('Error clearing AsyncStorage:', error);
        }
    }

    private async updateBestScore(newBestScore: number) {
        try {
            runInAction(() => (this.bestScore = newBestScore))
            await AsyncStorage.setItem('bestScore', newBestScore.toString())
        } catch (error) {
            runInAction(() => (this.error = 'Failed to save best score'))
            console.error('Error saving best score:', error)
        }
    }
}

export default GameStore
