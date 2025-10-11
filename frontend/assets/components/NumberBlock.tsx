import { View, Text } from 'react-native'
import React from 'react'
import { NumberBlockProps } from '../props/NumberBlockProps'
import { NumberBlockStyles } from '../styles/NumberBlockStyles'

const NumberBlock = ({ number, color, isDarkText }: NumberBlockProps) => {
    return (
        <View style={[NumberBlockStyles.container, { backgroundColor: color }]}>
            <Text style={[NumberBlockStyles.text, { color: isDarkText ? '#786F66' : 'white' }]}>{number}</Text>
        </View>
    )
}

export default NumberBlock
