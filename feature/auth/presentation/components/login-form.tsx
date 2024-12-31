import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { EyeIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";

export const LoginForm = () => {
  return (
    <Box className="w-full">
      <VStack className="space-y-4" space="md">
        <Text className="text-gray-599 text-sm">Usuario</Text>
        <Input
          variant="outline"
          size="md"
        >
          <InputField placeholder="example123" />
        </Input>
        <Text className="text-gray-599 text-sm">Contraseña</Text>
        <Input
          variant="outline"
          size="md"
        >
          <InputField placeholder="********" />
        </Input>

          <Button size="lg" className="w-full ">
            <Link href={"/"}>
              <ButtonText className="text-white font-semibold">
                Login
              </ButtonText>
            </Link>
          </Button>
      </VStack>
    </Box>
  );
};

