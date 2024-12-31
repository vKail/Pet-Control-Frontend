import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Image } from '@/components/ui/image';
import { LoginForm } from '../components/login-form';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';

export const LoginScreen = () => {
  return (
    <Box className="flex-1 bg-white p-6">
      <VStack className="w-full max-w-sm mx-auto space-y-8" space="xl">
        <Image 
          source={'https://img.freepik.com/vector-premium/hombre-abrazando-al-dueno-perro-abrazando-mascota-canina_316839-2947.jpg'}
          alt="logo"
          className="w-32 h-32 object-contain"
          size="md"
        />
        
        <VStack className="space-y-2" space="xs">
          <Heading className="text-2xl font-bold bg-black" size="xl">
            Welcome Back 👋
          </Heading>
          <Text className="text-gray-600 text-sm">
            Please enter your credentials to proceed to the next step.
          </Text>
        </VStack>

        <LoginForm />

        <Pressable>
          <Text className="text-center text-purple-600">
            Forgot your password?
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
};