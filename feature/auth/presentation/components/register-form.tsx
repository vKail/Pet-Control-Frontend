import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { IRegister } from "../../models/IRegister";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HStack } from "@/components/ui/hstack";

export const RegisterForm = () => {
  const { initialValues, validationSchema, onSubmit } = useRegisterForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  return (
    <Box>
      <HStack space="md">
        <Box className="w-1/2">
          <VStack space="xs">
            <Text className="text-gray-599 text-sm">Nombre</Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg">
                  <InputField
                    placeholder="Ingresa tu nombre"
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
              )}
            />
            {errors.firstName && (
              <Text className="text-red-500 text-xs">
                {errors.firstName.message}
              </Text>
            )}
          </VStack>
        </Box>

        <Box className="w-1/2">
          <VStack space="xs">
            <Text className="text-gray-599 text-sm">Apellido</Text>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg">
                  <InputField
                    placeholder="Ingresa tu apellido"
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
              )}
            />
            {errors.lastName && (
              <Text className="text-red-500 text-xs">
                {errors.lastName.message}
              </Text>
            )}
          </VStack>
        </Box>
      </HStack>
      <VStack className="space-y-4" space="md">
        <VStack space="xs">
          <Text className="text-gray-599 text-sm">Correo electrónico</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa tu correo electrónico"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs">{errors.email.message}</Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-599 text-sm">Nombre de usuario</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa tu nombre de usuario"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.username && (
            <Text className="text-red-500 text-xs">
              {errors.username.message}
            </Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-599 text-sm">Contraseña</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa tu contraseña"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs">
              {errors.password.message}
            </Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-599 text-sm">Numero de teléfono</Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa tu número de teléfono"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              </Input>
            )}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500 text-xs">
              {errors.phoneNumber.message}
            </Text>
          )}
        </VStack>

        <VStack space="xs">
          <Text className="text-gray-599 text-sm">Dirección</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Ingresa tu dirección"
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.address && (
            <Text className="text-red-500 text-xs">
              {errors.address.message}
            </Text>
          )}
        </VStack>

        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Registrarse</ButtonText>
        </Button>

        <Link href="/">
          <Text className="text-center text-gray-599 text-lg">
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </Link>
      </VStack>
    </Box>
  );
};
