import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useAuth } from '@/assets/hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import Login from '@/app/Login'

jest.mock('@/assets/hooks/useAuth')
jest.mock('@react-navigation/native')
jest.mock('@/assets/components/FieldInput')

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>

describe('Login Component', () => {
    const mockLogin = jest.fn()
    const mockNavigate = jest.fn()

    beforeEach(() => {
        mockUseAuth.mockReturnValue({login: mockLogin} as any)
        mockUseNavigation.mockReturnValue({navigate: mockNavigate} as any)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders correctly', () => {
        const { getByText } = render(<Login />)

        expect(getByText('Вход')).toBeTruthy()
        expect(getByText('Войти')).toBeTruthy()
        expect(getByText(/Если у вас нет аккаунта/)).toBeTruthy()
    })

    test('navigates to register screen when link is pressed', () => {
        const { getByText } = render(<Login />)

        fireEvent.press(getByText('ссылке'))

        expect(mockNavigate).toHaveBeenCalledWith('Register')
    })
})