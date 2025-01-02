import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { usePetStore } from "@/feature/pet/context/use-pet-store";
import { PetCard } from "@/feature/pet/presentation/components/pet-card";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { B } from "@expo/html-elements";
import { Link } from "expo-router";

export const UserHomeView = () => {
  const { pets, loading, fetchPetsByOwner } = usePetStore();

  useEffect(() => {
    // Aquí deberías obtener el ownerId del usuario actual
    const ownerId = 1; // Este valor debería venir de tu sistema de autenticación
    fetchPetsByOwner(ownerId);
  }, []);

  if (loading) {
    return <Spinner size={"large"} />;
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
          justifyContent: "center",
          paddingBottom: 20,
          paddingTop: Platform.OS === "ios" ? 60 : 20,
        }}
      >
        <VStack space="lg" className="p-4">
          <Heading size="xl" className="mb-4">
            Mis Mascotas
          </Heading>
          <Box className="flex-1">
            <Button size="lg" variant="solid" action="primary" className="w-full">
               <Link href="/(tabs)/pets/create">
                <ButtonText>Agregar una mascota</ButtonText>
                </Link> 
            </Button>
          </Box>
          <VStack space="md">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
