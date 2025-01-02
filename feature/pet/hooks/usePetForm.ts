import { z } from 'zod';

import Toast from 'react-native-toast-message';
import { IPet } from '../models/IPet';
import { usePetStore } from '../context/use-pet-store';

export const usePetForm = (currentPet? : Partial<IPet>) => {
   const {addPet, updatePet} = usePetStore(); 

    const initialValues: Omit<IPet, 'ownerId' | 'id'> = {
        name: currentPet?.name || '',
        birthDate: currentPet?.birthDate || '',
        gender: currentPet?.gender || '',
        specieId: currentPet?.specieId || 0,
        image: currentPet?.image || '',
    };

    const validationSchema = z.object({
        name: z.string().min(1, 'El nombre es requerido'),
        birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
        gender: z.string().min(1, 'El género es requerido'),
        specieId: z.number().min(1, 'La especie es requerida'),
    });

    const onSubmit = async (values: Omit<IPet, 'ownerId'>) => {
        const newValues = {
            ...values,
            ownerId: 1 // Este valor debería venir del contexto de usuario
        };

            currentPet ? await updatePet(currentPet.id ?? 0, newValues) : await addPet(newValues);
    };

    return {
        initialValues,
        validationSchema,
        onSubmit
    };
};
