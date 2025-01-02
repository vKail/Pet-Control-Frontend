import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { useLoginForm } from "../../hooks/useLoginForm";
import { ILogin } from "../../models/ILogin";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const { initialValues, validationSchema, onSubmit } = useLoginForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <Box>
      <VStack className="space-y-4" space="md">
        <Text className="text-gray-599 text-sm">Usuario</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Ingresa tu usuario"
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

        <VStack space="md">
          <Text className="text-gray-599 text-sm">Contraseña</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input className="text-center" size="lg" >
                <InputField
                  type={showPassword ? "text" : "password"}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingresa tu contraseña"
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs">
              {errors.password.message}
            </Text>
          )}
        </VStack>

        <VStack space="md">
          <HStack className="flex justify-end">
            <Button variant="link" size="lg">
              <Link href="/">
                <ButtonText>Olvidaste tu contraseña?</ButtonText>
              </Link>
            </Button>
          </HStack>
          <Button size="lg" className="" onPress={handleSubmit(onSubmit)}>
            <ButtonText>Iniciar sesión</ButtonText>
          </Button>
          <HStack className="flex justify-center" >
            <Button  variant="link" size="lg" >

              <Link href="/register">
                <ButtonText>No tienes una cuenta? Registrate aquí</ButtonText>
              </Link>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
