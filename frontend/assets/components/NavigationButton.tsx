import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationButtonProps } from '../props/NavigationButtonProps'
import { styles } from '../styles/NavigationButtonStyles'

const NavigationButton = ({ text, func, width, height }: NavigationButtonProps) => {
    return (
        <TouchableOpacity style={[
            styles.button,
            {
                width: width ?? styles.button.width,
                height: height ?? styles.button.height
            }
        ]}
            onPress={func}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default NavigationButton
