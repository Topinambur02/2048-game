import { stores } from '@/assets/stores'
import GameStore from '@/assets/stores/GameStore'

jest.mock('@/assets/stores/GameStore')

describe('Stores', () => {
    describe('stores object', () => {
        test('should contain gameStore instance', () => {
            expect(stores.gameStore).toBeInstanceOf(GameStore)
        })
    })
})
