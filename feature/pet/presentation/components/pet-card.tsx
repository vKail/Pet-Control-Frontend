import React from 'react';
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { Card } from '@/components/ui/card';
import { IPetResponse } from '../../models/IPet';

interface PetCardProps {
    pet: IPetResponse;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    return (
        <Card className="p-5 rounded-lg max-w-[360px] m-3">
            <Image
                source={{
                    uri: pet.specie?.image || "/api/placeholder/400/320"
                }}
                className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
                alt={`${pet.name}'s photo`}
            />
            <Text className="text-sm font-normal mb-2 text-typography-700">
                {new Date(pet.birthDate).toLocaleDateString()}
            </Text>
            <Heading size="md" className="mb-4">
                {pet.name} - {pet.specie?.name}
            </Heading>
            <Link href={{
                pathname: "/(tabs)/pets/info/[id]/vaccines",
                params: { id: pet.id }
            }}>
                <Button size="lg" variant="solid" action="primary" className="w-full">
                    <ButtonText>Registro de vacunas</ButtonText>
                </Button>
            </Link>
        </Card>
    );
};
