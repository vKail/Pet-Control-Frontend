import React from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaccinesForm } from "../../hooks/useVaccinesForm";
import { useLocalSearchParams } from "expo-router";
import { IVaccines } from "../../model/IVaccines";

interface VaccineFormProps {
  currentVaccine?: Partial<IVaccines>;
}

export const VaccineForm = ({ currentVaccine }: VaccineFormProps) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const petId = parseInt(id);
  
  const { initialValues, validationSchema, onSubmit } = useVaccinesForm(petId, currentVaccine);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IVaccines, 'id'>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = (values: Omit<IVaccines, 'id'>) => {
    onSubmit(values, petId);
  };

  return (
    <Box className="w-full max-w-md mx-auto">
      <VStack space="md">
        <VStack space="xs">
          <Text className="text-gray-600">Nombre de la vacuna</Text>
          <Controller
            control={control}
            name="vaccine"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa el nombre de la vacuna"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.vaccine && (
            <Text className="text-red-500 text-xs">{errors.vaccine.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-600">Fecha de aplicación</Text>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="YYYY-MM-DD"
                  onChangeText={onChange}
                  value={value}
                  type="text"
                />
              </Input>
            )}
          />
          {errors.date && (
            <Text className="text-red-500 text-xs">{errors.date.message}</Text>
          )}
        </VStack>

        <Button
          size="lg"
          variant="solid"
          action="primary"
          onPress={handleSubmit(handleFormSubmit)}
        >
          <ButtonText>
            {currentVaccine ? "Actualizar Vacuna" : "Registrar Vacuna"}
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};