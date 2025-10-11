import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '@/assets/hooks/useAuth'
import Register from '@/app/Register'

jest.mock('@/assets/hooks/useAuth')
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native')
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    }
})

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('Register Component', () => {
    beforeEach(() => {
        mockUseAuth.mockReturnValue({ register: jest.fn() } as any)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    const renderComponent = () =>
        render(
            <NavigationContainer>
                <Register />
            </NavigationContainer>
        )

    test('renders all form elements correctly', () => {
        renderComponent()

        expect(screen.getByText('Registration')).toBeTruthy()
        expect(screen.getByPlaceholderText('Email')).toBeTruthy()
        expect(screen.getByPlaceholderText('Username')).toBeTruthy()
        expect(screen.getByPlaceholderText('Password')).toBeTruthy()
        expect(screen.getByPlaceholderText('Confirm password')).toBeTruthy()
        expect(screen.getByText('Sign up')).toBeTruthy()
    })

    test('submits the form with the correct data', async () => {
        const mockRegister = jest.fn()
        mockUseAuth.mockReturnValue({
            register: mockRegister,
        } as any)

        renderComponent()

        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'valid@example.com')
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'validuser')
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123')
        fireEvent.changeText(screen.getByPlaceholderText('Confirm password'), 'password123')

        fireEvent.press(screen.getByText('Sign up'))

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith({
                email: 'valid@example.com',
                username: 'validuser',
                password: 'password123',
                bestScore: 0,
                audio_volume: 50,
            })
        })
    })
})
