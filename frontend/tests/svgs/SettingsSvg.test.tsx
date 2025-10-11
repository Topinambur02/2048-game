import React from 'react'
import { render } from '@testing-library/react'
import SettingsSvg from '@/assets/svgs/SettingsSvg'

describe('SettingsSvg', () => {
    test('renders without crashing', () => {
        render(<SettingsSvg />)
    })
})
