import { View, Text } from 'react-native'
import React from 'react'
import { ScoreBlockProps } from '../props/ScoreBlockProps'
import { styles } from '../styles/ScoreBlockStyles'

const ScoreBlock = ({ text, number }: ScoreBlockProps) => {
    return (
        <View style={styles.scoreContainer}>
            <View style={styles.content}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.number}>{number}</Text>
            </View>
        </View>
    )
}

export default ScoreBlock