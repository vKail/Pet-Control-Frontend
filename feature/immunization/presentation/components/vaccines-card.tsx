import React from "react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { IVaccinesResponse } from "../../model/IVaccines";
import { HStack } from "@/components/ui/hstack";
import { Avatar, AvatarImage, AvatarFallbackText } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { Link } from "expo-router";
import { useVaccineStore } from "../../context/use-vaccines-store";

interface VaccineCardProps {
  vaccine: IVaccinesResponse;
}

export const VaccineCard: React.FC<VaccineCardProps> = ({ vaccine }) => {
  const { deleteVaccine } = useVaccineStore();
  
  // Verificar que vaccine y sus propiedades existan antes de usarlas
  if (!vaccine) return null;

  const formattedDate = new Date(vaccine.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDelete = async () => {
    if (vaccine.id) {
      await deleteVaccine(vaccine.id);
    }
  };

  // Generar iniciales solo si pet y name existen
  const petInitials = vaccine.pet?.name 
    ? vaccine.pet.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
    : "P";

  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3">
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {formattedDate}
      </Text>

      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
          {vaccine.vaccine}
        </Heading>
        <Text size="sm" className="text-gray-600">
          Registro de vacunación aplicada a tu mascota. 
          {vaccine.pet?.name && ` Esta vacuna es importante para mantener la salud y el bienestar de ${vaccine.pet.name}.`}
        </Text>
      </VStack>

      <Box>
        <HStack className="justify-between items-center">
          <HStack className="space-x-3">
            <Avatar>
              <AvatarFallbackText>{petInitials}</AvatarFallbackText>
              {vaccine.pet?.image && (
                <AvatarImage
                  source={{
                    uri: vaccine.pet.image
                  }}
                  alt={vaccine.pet?.name || 'Pet'}
                />
              )}
            </Avatar>
            <VStack>
              <Heading size="sm" className="mb-1">
                {vaccine.pet?.name || 'Mascota'}
              </Heading>
              <Text size="sm" className="text-gray-600">
                {vaccine.pet?.name || "Mascota"}
              </Text>
            </VStack>
          </HStack>

          <HStack space="sm">
            {/* (
              <Link
                href={{
                  pathname: "/(tabs)/pets/info/[id]/vaccines/edit/[vaccineId]",
                  params: { 
                    id: vaccine.pet.id.toString(),
                    vaccineId: vaccine.id.toString()
                  }
                }}
              >
                <Button size="sm" variant="outline" action="secondary">
                  <ButtonText>Editar</ButtonText>
                </Button>
              </Link>
            ) */}
            <Button
              size="sm"
              variant="outline"
              action="negative"
              onPress={handleDelete}
            >
              <Trash2 size={18} className="text-red-500" />
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Card>
  );
};