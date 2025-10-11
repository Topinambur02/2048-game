import NumberBlock from '@/assets/components/NumberBlock'
import { render } from '@testing-library/react'
import React from 'react'

describe('NumberBlock', () => {
    test('renders without crashing', () => {
        render(<NumberBlock number={''} color={''} isDarkText={false} />)
    })
})
