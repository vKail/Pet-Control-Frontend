import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { VStack } from "@/components/ui/vstack"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { PetForm } from "../components/pet-form"
import { IPet } from "../../models/IPet"
import { usePetStore } from "../../context/use-pet-store"


export const PetUpdateView = ({id}: {id: number}) => {
    const {pets} = usePetStore();
    const currentPet = pets.find(pet => pet.id === id);
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
                        Actualiza los datos de tu peludito 🐾
                    </Heading>
                    <Box className="flex-1">
                        <PetForm currentPet={currentPet}/>
                    </Box>
                </VStack>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}