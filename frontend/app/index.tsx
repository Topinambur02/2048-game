import { IndexScreenNavigationProp } from "@/assets/props/IndexScreenNavigationProp"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "@/assets/styles/MainPageStyles"
import NumberBlock from "@/assets/components/NumberBlock"

export default function Index() {
  const navigation = useNavigation<IndexScreenNavigationProp>()

  return (
    <View style={styles.container}>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <NumberBlock number="2" color="#EDE0C8" isDarkText={true} />
          <NumberBlock number="0" color="#EDC850" isDarkText={false} />
        </View>
        <View style={styles.row}>
          <NumberBlock number="4" color="#F67C5F" isDarkText={false} />
          <NumberBlock number="8" color="#F65E3C" isDarkText={false} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Играть</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Leaderboard')}
      >
        <Text style={styles.buttonText}>Таблица лидеров</Text>
      </TouchableOpacity>
    </View>
  )
}
