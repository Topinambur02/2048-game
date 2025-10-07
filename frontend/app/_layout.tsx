import { Stack } from "expo-router"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { StoreContext, stores } from "@/assets/stores"
import { useAudio } from "@/assets/hooks/useAudio"
import { VolumeContext } from "@/assets/contexts/VolumeContext"
import { AuthProvider } from "@/assets/provider/AuthProvider"

export default function RootLayout() {
  const musicPath = require('./../assets/music/Heart-Of-The-Ocean.mp3')
  const options = { shouldPlay: true, isLooping: true }
  const volumeContext = useAudio(musicPath, options)

  return (
    <VolumeContext.Provider value={volumeContext}>
      <StoreContext.Provider value={stores}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#faf8ef' }}>
            <StatusBar
              style="dark"
              backgroundColor="#faf8ef"
            />
            <Stack screenOptions={{
              headerShown: false
            }} />
          </SafeAreaView>
        </AuthProvider>
      </StoreContext.Provider>
    </VolumeContext.Provider>
  )
}
