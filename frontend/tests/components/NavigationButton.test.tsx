import NavigationButton from '@/assets/components/NavigationButton'
import { render } from '@testing-library/react'
import React from 'react'

describe('NavigationButton', () => {
    test('renders without crashing', () => {
        render(<NavigationButton text={''} func={() => {}} />)
    })
})
