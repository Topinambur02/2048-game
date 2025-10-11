import { View, Text } from 'react-native'
import React from 'react'
import { getColor } from '../utils/getColor'
import { BoardCellProps } from '../props/BoardCellProps'
import { styles } from '../styles/BoardCellStyles'

const BoardCell = ({ text = '0' }: BoardCellProps) => {
    const number = Number.parseInt(text)
    const color = getColor(number)

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.text}>{text === '0' ? '' : text}</Text>
        </View>
    )
}

export default BoardCell
