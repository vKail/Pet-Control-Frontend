import { LoginScreen } from "@/feature/auth/presentation/views/login-view"
import { verifyInstallation } from 'nativewind';
const Main = () => {
verifyInstallation();
    return <LoginScreen />
}

export default Main

// import React from 'react'
// import { Pressable, Text, View } from 'react-native'
// import { Link } from 'expo-router'
// import { Button, ButtonText } from '@/components/ui/button'

// const Main = () => {
//   return (
//     <View className="flex justify-center items-center h-full">
//       <Text className="text-red-600">Hello World</Text>
//         <Pressable>
//           <Text>Home</Text>
//         </Pressable>
//       <Button size="md" variant="solid" action="primary">
//         <ButtonText>Hello World!</ButtonText>
//       </Button>
//     </View>
//   )
// }

// export default Main