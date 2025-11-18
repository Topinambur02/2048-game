import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8ef',
    },
    upperBlock: {
        paddingTop: 25,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftSide: {},
    rightSide: {},
    blockContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 600,
        fontSize: 18,
        alignSelf: 'center',
        color: '#776E65',
    },
    helpInformationButton: {
        marginTop: 10,
        marginLeft: 20
    }
})
