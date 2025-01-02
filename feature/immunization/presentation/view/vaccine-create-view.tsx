import React from "react";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Image } from "@/components/ui/image";
import { useLocalSearchParams } from "expo-router";
import { VaccineForm } from "../components/vaccines-form";

export const VaccineCreateView = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

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
          justifyContent: "center",
          paddingBottom: 20,
          paddingTop: Platform.OS === "ios" ? 60 : 20,
        }}
      >
        <VStack space="lg" className="p-4">
          <Heading size="xl" className="mb-4 flex justify-center">
            Registrar Nueva Vacuna 💉
          </Heading>
          <Image
            source={'/api/placeholder/400/320'}
            className="mx-auto h-[240px] w-full rounded-md aspect-[263/240]"
            alt="Vaccine illustration"
          />
          <Box className="flex-1">
            <VaccineForm />
          </Box>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};