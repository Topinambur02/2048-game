import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8ef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        width: 230,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        margin: 'auto',
    },
    button: {
        backgroundColor: '#8f7a66',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginVertical: 10,
        minWidth: 200,
        alignItems: 'center',
        width: 230,
    },
    buttonText: {
        color: '#f9f6f2',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
