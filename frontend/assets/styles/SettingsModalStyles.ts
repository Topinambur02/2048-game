import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#faf8ef',
        padding: 20,
        borderRadius: 10,
        minWidth: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#776E65',
    },
    soundSetting: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    volumeText: {
        fontSize: 16,
        marginVertical: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
})
