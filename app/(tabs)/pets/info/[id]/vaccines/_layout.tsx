import React from 'react'
import { Stack } from 'expo-router'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import Toast from 'react-native-toast-message'

const VaccinesLayout = () => {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="create" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen 
          name="edit/[vaccineId]" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
      </Stack>
      <Toast />
    </GluestackUIProvider>
  )
}

export default VaccinesLayout