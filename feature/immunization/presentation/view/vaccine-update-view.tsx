import React from "react";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useVaccineStore } from "../../context/use-vaccines-store";
import { VaccineForm } from "../components/vaccines-form";

export const VaccineEditView = ({vaccineId}: {vaccineId: number}) => {
  const { vaccines } = useVaccineStore();
  
  const currentVaccine = vaccines.find(
    vaccine => vaccine.id === Number(vaccineId)
  );

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
          <Heading size="xl" className="mb-4">
            Actualizar Vacuna 💉
          </Heading>
          <Box className="flex-1">
            <VaccineForm 
              currentVaccine={currentVaccine}
            />
          </Box>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};