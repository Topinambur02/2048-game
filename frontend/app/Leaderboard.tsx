import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useAuth } from '@/assets/hooks/useAuth'
import NavigationButton from '@/assets/components/NavigationButton'
import { useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import { styles } from '@/assets/styles/LeaderboardStyles'
import { observer } from 'mobx-react-lite'

const Leaderboard = () => {
    const { users } = useAuth()
    const sortedUsers = users?.sort((a, b) => b.bestScore - a.bestScore) || []
    const navigation = useNavigation<IndexScreenNavigationProp>()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏆 Таблица лидеров</Text>

            <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.headerCell, styles.rank]}>Место</Text>
                    <Text style={[styles.cell, styles.headerCell, styles.name]}>Игрок</Text>
                    <Text style={[styles.cell, styles.headerCell, styles.score]}>Очки</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    {sortedUsers.map((user, index) => (
                        <View
                            key={user.id}
                            style={[
                                styles.row,
                                styles.userRow,
                                index % 2 === 0 && styles.evenRow
                            ]}
                        >
                            <Text style={[styles.cell, styles.rank, styles.rankText]}>
                                {index + 1}
                            </Text>
                            <Text style={[styles.cell, styles.name]} numberOfLines={1}>
                                {user.username}
                            </Text>
                            <Text style={[styles.cell, styles.score, styles.scoreText]}>
                                {user.bestScore}
                            </Text>
                        </View>
                    ))}

                    {sortedUsers.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>Пока нет участников</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

            <NavigationButton
                text='MENU'
                func={() => navigation.goBack()}
            />
        </View>
    )
}

export default observer(Leaderboard)