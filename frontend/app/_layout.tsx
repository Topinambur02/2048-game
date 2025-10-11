import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAudio } from '@/assets/hooks/useAudio'
import { VolumeContext } from '@/assets/contexts/VolumeContext'
import { AuthProvider } from '@/assets/provider/AuthProvider'
import { styles } from '@/assets/styles/RootLayoutStyles'
import { StoreContext } from '@/assets/contexts/StoreContext'
import { stores } from '@/assets/stores'

export default function RootLayout() {
    const musicPath = require('./../assets/music/Heart-Of-The-Ocean.mp3')
    const musicOptions = { shouldPlay: true, isLooping: true }
    const screenOptions = { headerShown: false }
    const volumeContext = useAudio(musicPath, musicOptions)

    return (
        <VolumeContext.Provider value={volumeContext}>
            <StoreContext.Provider value={stores}>
                <AuthProvider>
                    <SafeAreaView style={styles.container}>
                        <StatusBar style="dark" backgroundColor="#faf8ef" />
                        <Stack screenOptions={screenOptions} />
                    </SafeAreaView>
                </AuthProvider>
            </StoreContext.Provider>
        </VolumeContext.Provider>
    )
}
