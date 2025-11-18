import { Image, TouchableOpacity, Linking, Alert } from 'react-native'
import React from 'react'
import { styles } from '../styles/FooterStyles'

const Footer = () => {
    const handlePress = async () => {
        const url = 'https://www.mospolytech.ru/'
        const supported = await Linking.canOpenURL(url)

        if (supported) {
            await Linking.openURL(url)
        } else {
            Alert.alert(`Не могу открыть ссылку: ${url}`)
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Image
                source={require('@/assets/icons/moscowpolitech.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}

export default Footer