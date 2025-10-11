import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import SettingsSvg from '../svgs/SettingsSvg'
import { styles } from '../styles/SettingsStyles'
import { SettingsProps } from '../props/SettingsProps'

const Settings = ({ onPress }: SettingsProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.settingsContainer}>
                <SettingsSvg />
            </View>
        </TouchableOpacity>
    )
}

export default Settings
