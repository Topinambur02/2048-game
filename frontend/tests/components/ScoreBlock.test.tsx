import ScoreBlock from '@/assets/components/ScoreBlock'
import { render } from '@testing-library/react'
import React from 'react'

describe('ScoreBlock', () => {
    test('renders without crashing', () => {
        render(<ScoreBlock text={''} number={0} />)
    })
})
