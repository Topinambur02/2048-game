import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8ef',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    linkToReg: {
        fontSize: 10,
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    button: {
        backgroundColor: '#F59663',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
})
