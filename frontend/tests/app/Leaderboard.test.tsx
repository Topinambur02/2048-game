import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { useAuth } from '@/assets/hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import Leaderboard from '@/app/Leaderboard'

jest.mock('@/assets/hooks/useAuth')
jest.mock('@/assets/components/NavigationButton')
jest.mock('@react-navigation/native')

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>

describe('Leaderboard', () => {
    const mockGoBack = jest.fn()

    beforeEach(() => {
        mockUseNavigation.mockReturnValue({
            goBack: mockGoBack,
        } as any)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('displays the title and the leaderboard', () => {
        mockUseAuth.mockReturnValue({
            users: [
                { id: '1', username: 'User1', bestScore: 100 },
                { id: '2', username: 'User2', bestScore: 200 },
            ],
        } as any)

        render(<Leaderboard />)

        expect(screen.getByText('🏆 Таблица лидеров')).toBeTruthy()
        expect(screen.getByText('Место')).toBeTruthy()
        expect(screen.getByText('Игрок')).toBeTruthy()
        expect(screen.getByText('Очки')).toBeTruthy()
    })

    test('displays the correct user ranks', () => {
        mockUseAuth.mockReturnValue({
            users: [
                { id: '1', username: 'User1', bestScore: 300 },
                { id: '2', username: 'User2', bestScore: 200 },
            ],
        } as any)

        render(<Leaderboard />)

        expect(screen.getByText('1')).toBeTruthy()
        expect(screen.getByText('2')).toBeTruthy()
    })

    test('processes an empty list of users', () => {
        mockUseAuth.mockReturnValue({
            users: [],
        } as any)

        render(<Leaderboard />)

        expect(screen.getByText('Пока нет участников')).toBeTruthy()
    })

    test('displays no more than one user with the same account', () => {
        mockUseAuth.mockReturnValue({
            users: [
                { id: '1', username: 'User1', bestScore: 100 },
                { id: '2', username: 'User2', bestScore: 100 },
            ],
        } as any)

        render(<Leaderboard />)

        const scores = screen.getAllByText('100')
        expect(scores).toHaveLength(2)
    })

    test('truncates long user names', () => {
        mockUseAuth.mockReturnValue({
            users: [
                { id: '1', username: 'Очень длинное имя пользователя', bestScore: 100 },
            ],
        } as any)

        render(<Leaderboard />)

        const name = screen.getByText('Очень длинное имя пользователя')
        expect(name.props.numberOfLines).toBe(1)
    })

    test('handles the absence of users', () => {
        mockUseAuth.mockReturnValue({
            users: null,
        } as any)

        render(<Leaderboard />)

        expect(screen.getByText('Пока нет участников')).toBeTruthy()
    })
})