import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { RegisterForm } from "../components/register-form";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export const RegisterScreen = () => {

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
        <Box className="flex items-center py-4">
          <VStack className="w-full max-w-sm mx-auto space-y-4" space="md">
            <VStack className="space-y-2" space="xs">
              <Heading className="flex-1 flex text-2xl font-bold justify-center mx-auto" size="xl">
                Crear nueva cuenta 🐾
              </Heading>
              <Image
                source={
                  "https://img.freepik.com/vector-premium/hombre-abrazando-al-dueno-perro-abrazando-mascota-canina_316839-2947.jpg"
                }
                alt="logo"
                className="w-52 h-52 object-contain mx-auto"
                size="md"
              />
              <Text className="text-gray-599 text-sm mx-auto">
                Completa tus datos para registrarte
              </Text>
            </VStack>

            <RegisterForm />

          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};