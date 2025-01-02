import React from 'react'
import { Stack } from 'expo-router'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '../global.css'
import Toast from 'react-native-toast-message'

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </GluestackUIProvider>
  )
}

export default Layout