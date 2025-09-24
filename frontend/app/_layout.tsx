import { Stack } from "expo-router"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf8ef' }}>
      <StatusBar
        style="dark"
        backgroundColor="#faf8ef"
      />
      <Stack screenOptions={{
        headerShown: false
      }} />
    </SafeAreaView>
  )
}
