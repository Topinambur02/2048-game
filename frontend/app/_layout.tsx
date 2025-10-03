import { Stack } from "expo-router"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { StoreContext, stores } from "@/assets/stores"
import { useAudio } from "@/assets/hooks/useAudio"

export default function RootLayout() {
  const musicPath = require('./../assets/music/Heart-Of-The-Ocean.mp3')
  const options = { shouldPlay: true, isLooping: true }

  useAudio(musicPath, options)

  return (
    <StoreContext.Provider value={stores}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#faf8ef' }}>
        <StatusBar
          style="dark"
          backgroundColor="#faf8ef"
        />
        <Stack screenOptions={{
          headerShown: false
        }} />
      </SafeAreaView>
    </StoreContext.Provider>
  )
}
