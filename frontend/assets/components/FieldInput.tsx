import { View, TextInput, Text } from 'react-native'
import React from 'react'
import { FieldInputProps } from '../props/FieldInputProps'
import { styles } from '../styles/FieldInputStyles'

const FieldInput = ({
    value,
    type,
    placeholder,
    isTouched,
    error,
    onChangeText,
    autoCapitalize,
    onBlur,
}: FieldInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.regularInput, isTouched && error ? styles.inputError : styles.inputNormal]}
                id={value}
                secureTextEntry={type === 'password'}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                onBlur={onBlur}
            />
            {isTouched && error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default FieldInput
