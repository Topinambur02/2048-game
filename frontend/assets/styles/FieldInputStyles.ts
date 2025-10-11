import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        marginTop: 16,
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
    },
})
