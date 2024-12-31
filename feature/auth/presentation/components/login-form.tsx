import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { EyeIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import React from 'react';

export const LoginForm = () => {
  return (
    <Box className="w-full">
      <VStack className="space-y-4" space="md">
       <Input
  variant="outline"
  size="md"
  isDisabled={false}
  isInvalid={false}
  isReadOnly={false}
>
  <InputField placeholder="Enter Text here..." />
</Input>

       <Input
  variant="outline"
  size="md"
  isDisabled={false}
  isInvalid={false}
  isReadOnly={false}
>
  <InputField placeholder="Enter Text here..." />
</Input>



        <Button size="lg" className="w-full bg-purple-600 py-3 rounded-lg">
          <ButtonText className="text-white font-semibold">Login</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};