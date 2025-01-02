import React from 'react'
import { Slot, Stack } from 'expo-router'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import Toast from 'react-native-toast-message'

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} /> */}
        <Slot/>
      </Stack>
      <Toast />
    </GluestackUIProvider>
  )
}

export default Layout