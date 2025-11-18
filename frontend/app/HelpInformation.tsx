import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import WhatIsComputerScience from '@/assets/articles/WhatIsComputerScience'
import LanguageIsAMeansOfEncoding from '@/assets/articles/LanguageIsAMeansOfEncoding'
import NumberSystems from '@/assets/articles/NumberSystems'
import DiscreteEncoding from '@/assets/articles/DiscreteEncoding'
import BinaryNumberSystem from '@/assets/articles/BinaryNumberSystem'

const HelpInformation = () => {
    const [activeSections, setActiveSections] = useState<{ [key: number]: boolean }>({})
    const [animation] = useState(new Animated.Value(0))

    const toggleSection = (index: number) => {
        setActiveSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }))

        Animated.timing(animation, {
            toValue: activeSections[index] ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const topics = [
        {
            title: 'Что такое информатика?',
            content: WhatIsComputerScience
        },
        {
            title: 'Язык - средство кодирования',
            content: LanguageIsAMeansOfEncoding
        },
        {
            title: 'Системы счисления',
            content: NumberSystems
        },
        {
            title: 'Дискретное кодирование',
            content: DiscreteEncoding
        },
        {
            title: 'Двоичная система счисления',
            content: BinaryNumberSystem
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Справка</Text>

                {topics.map((topic, index) => (
                    <View key={index} style={styles.section}>
                        <TouchableOpacity
                            style={styles.sectionHeader}
                            onPress={() => toggleSection(index)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.sectionTitle}>Тема {index + 1}. {topic.title}</Text>
                            <Text style={styles.arrow}>
                                {activeSections[index] ? '▼' : '▶'}
                            </Text>
                        </TouchableOpacity>

                        {activeSections[index] && (
                            <View style={styles.sectionContent}>
                                <Text style={styles.sectionText}>{topic.content}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8ef',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F59663',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    arrow: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
    sectionContent: {
        padding: 16,
        backgroundColor: '#fff',
    },
    sectionText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
})

export default HelpInformation