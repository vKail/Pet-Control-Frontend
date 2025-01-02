import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useLocalSearchParams, Link } from "expo-router";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import { useVaccineStore } from "../../context/use-vaccines-store";
import { VaccineCard } from "../components/vaccines-card";

export const VaccinesView = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { vaccines, loading, fetchVaccinesByPetId } = useVaccineStore();

  useEffect(() => {
    if (id) {
      fetchVaccinesByPetId(Number(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner size="large" />;
  }

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
          paddingBottom: 20,
          paddingTop: Platform.OS === "ios" ? 60 : 20,
        }}
      >
        <VStack space="lg" className="p-4">
          <Heading size="xl" className="mb-4">
            Registro de Vacunas 💉
          </Heading>

          <Box className="mb-6">
            <Link
              href={{
                pathname: "/(tabs)/pets/info/[id]/vaccines/create",
                params: { id }
              }}
            >
              <Button
                size="lg"
                variant="solid"
                action="primary"
                className="w-full"
              >
                <Plus size={20} className="mr-2" />
                <ButtonText>Agregar Nueva Vacuna</ButtonText>
              </Button>
            </Link>
          </Box>

          {vaccines.length === 0 ? (
            <Box className="flex items-center justify-center py-8">
              <Heading size="sm" className="text-gray-500">
                No hay vacunas registradas
              </Heading>
            </Box>
          ) : (
            <VStack space="md">
              {vaccines.map((vaccine) => (
                <VaccineCard key={vaccine.id} vaccine={vaccine} />
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};