import React, { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePetForm } from "../../hooks/usePetForm";
import { IPet } from "../../models/IPet";
import { useSpecieStore } from "@/feature/specie/context/use-specie-store";
import { Link } from "expo-router";

export const PetForm = ({ currentPet }: { currentPet?: Partial<IPet> }) => {
  const { initialValues, validationSchema, onSubmit } = usePetForm(currentPet);
  const { species, fetchAllSpecies, loading } = useSpecieStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IPet, "ownerId">>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    fetchAllSpecies();
  }, []);

  return (
    <Box className="w-full max-w-md mx-auto">
      <VStack space="md">
        <VStack space="xs">
          <Text className="text-gray-600">Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa el nombre de la mascota"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-xs">{errors.name.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-600">Fecha de nacimiento</Text>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa la fecha de nacimiento"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.birthDate && (
            <Text className="text-red-500 text-xs">
              {errors.birthDate.message}
            </Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-600">Imagen</Text>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa la URL de la imagen"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.image && (
            <Text className="text-red-500 text-xs">{errors.image.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-600">Género</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value}
                onValueChange={(val) => onChange(val)}
              >
                <SelectTrigger variant="outline">
                  <SelectInput placeholder="Seleccione el género" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Macho" value="Macho" />
                    <SelectItem label="Hembra" value="Hembra" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            )}
          />
        </VStack>
        <VStack space="xs">
          <Text className="text-gray-600">Especie</Text>
          <Controller
            control={control}
            name="specieId"
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value?.toString()}
                onValueChange={(val) => onChange(Number(val))}
              >
                <SelectTrigger variant="outline">
                  <SelectInput placeholder="Seleccione la especie" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {species.map((specie) => (
                      <SelectItem
                        key={specie.id}
                        label={specie.name}
                        value={specie.id.toString()}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            )}
          />
          {errors.specieId && (
            <Text className="text-red-500 text-xs">
              {errors.specieId.message}
            </Text>
          )}
        </VStack>

        <VStack space="lg" className="mt-6">
          <Button
            size="lg"
            variant="solid"
            action="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <ButtonText>
              {loading ? "Guardando..." : currentPet ? "Actualizar" : "Guardar"}
            </ButtonText>
          </Button>

          <Link href="/(tabs)/home" className="mt-4">
            <Button size="lg" variant="outline" className="w-full">
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
};