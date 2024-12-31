import React from 'react'
import { Slot } from 'expo-router'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '../global.css'
const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <Slot />
    </GluestackUIProvider>
  )
}
export default Layout