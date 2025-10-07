import { View, StyleSheet, TextInput, Text } from 'react-native'
import React from 'react'
import { FieldInputProps } from '../props/FieldInputProps'

const FieldInput = ({ 
    value, 
    type, 
    placeholder, 
    isTouched, 
    error, 
    isSmall = false, 
    onChangeText, 
    autoCapitalize, 
    onBlur 
}: FieldInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isSmall ? styles.smallInput : styles.regularInput,
                    isTouched && error ? styles.inputError : styles.inputNormal
                ]}
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

export const styles = StyleSheet.create({
    container: {
        marginTop: 16
    },
    input: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    regularInput: {
        width: 320,
    },
    smallInput: {
        width: '100%',
    },
    inputNormal: {
        borderColor: '#D1D5DB',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        marginTop: 6,
        fontSize: 14,
        color: '#DC2626',
    }
})

export default FieldInput