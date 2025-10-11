import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8ef',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#776E65',
        textAlign: 'center',
        marginBottom: 30,
    },
    table: {
        backgroundColor: '#faf8ef',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        minHeight: 200,
    },
    scrollView: {
        maxHeight: 400,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        minHeight: 50,
    },
    header: {
        backgroundColor: '#776E65',
        paddingVertical: 15,
    },
    userRow: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    evenRow: {
        backgroundColor: '#f8f8f8',
    },
    cell: {
        color: '#333',
    },
    headerCell: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    rank: {
        width: '20%',
        textAlign: 'center',
    },
    name: {
        width: '50%',
        fontSize: 16,
        paddingLeft: 10,
    },
    score: {
        width: '30%',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '600',
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#776E65',
    },
    scoreText: {
        color: '#ff6b35',
        fontWeight: 'bold',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
})
