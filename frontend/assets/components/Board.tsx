import { View } from 'react-native'
import React from 'react'
import BoardCell from './BoardCell'
import { BoardProps } from '../props/BoardProps'
import { styles } from '../styles/BoardStyles'

const Board = ({ board }: BoardProps) => {
    return (
        <View style={styles.container}>
            {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cellValue, cellIndex) => (
                        <BoardCell 
                            key={`${rowIndex}-${cellIndex}`} 
                            text={cellValue.toString()}
                        />
                    ))}
                </View>
            ))}
        </View>
    )
}

export default Board