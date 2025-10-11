import LoseModal from '@/assets/components/LoseModal'
import { render } from '@testing-library/react'
import React from 'react'

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: jest.fn(),
    }),
}))

describe('LoseModal', () => {
    test('renders without crashing', () => {
        render(
            <LoseModal
                showLoseModal={false}
                setShowLoseModal={() => {}}
                initializeBoard={() => {}}
                onClose={() => {}}
            />
        )
    })
})
