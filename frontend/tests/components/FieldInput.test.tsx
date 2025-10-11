import FieldInput from '@/assets/components/FieldInput'
import { render } from '@testing-library/react'
import React from 'react'

describe('FieldInput', () => {
    test('renders without crashing', () => {
        render(
            <FieldInput
                value={''}
                type={'text'}
                placeholder={''}
                isTouched={undefined}
                error={undefined}
                onChangeText={() => {}}
                onBlur={() => {}}
                autoCapitalize={'none'}
            />
        )
    })
})
