import { Box } from "@/components/ui/box"
import { Heading } from "@/components/ui/heading"
import { VStack } from "@/components/ui/vstack"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { PetForm } from "../components/pet-form"
import { Image } from "@/components/ui/image"

export const PetCreateView = () => {
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
                        Agregar a tu nueva compañía 🐾
                    </Heading>
                    <Image
                        source={'https://img.freepik.com/vector-premium/gato-rojo-duerme-alfombrapetsilustracion-vectorial-dibujos-animados-plana-aislada-sobre-fondo-blanco_301420-1200.jpg'}
                        className="mx-auto h-[240px] w-full rounded-md aspect-[263/240]"
                        alt="Pet's photo"
                    />
                    <Box className="flex-1">
                        <PetForm />
                    </Box>
                </VStack>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}