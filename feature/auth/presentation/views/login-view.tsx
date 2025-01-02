import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { LoginForm } from "../components/login-form";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Center } from "@/components/ui/center";

export const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          flexGrow: 1,
          justifyContent: 'center',
          paddingBottom: 20,
          paddingTop: Platform.OS === 'ios' ? 60 : 20
        }}
      >
        <Box className="flex-1 justify-center items-center min-h-full py-8">
          <VStack className="w-full max-w-sm mx-auto space-y-8" space="xl">
            <VStack className="space-y-2 items-center" space="xs">
              <Heading className="text-2xl font-bold text-center" size="xl">
                Bienvenido de vuelta 👋
              </Heading>
              <Image
                source={
                  "https://img.freepik.com/vector-premium/hombre-abrazando-al-dueno-perro-abrazando-mascota-canina_316839-2947.jpg"
                }
                alt="logo"
                className="w-52 h-52 object-contain"
                size="md"
              />
              <Text className="text-gray-599 text-sm text-center">
                Inicia sesión para continuar
              </Text>
            </VStack>
            <LoginForm />
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
