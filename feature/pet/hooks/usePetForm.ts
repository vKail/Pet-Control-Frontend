import { z } from 'zod';

import Toast from 'react-native-toast-message';
import { IPet } from '../models/IPet';
import { usePetStore } from '../context/use-pet-store';

export const usePetForm = () => {
   const {addPet} = usePetStore(); 

    const initialValues: Omit<IPet, 'ownerId'> = {
        name: '',
        birthDate: '',
        gender: '',
        specieId: 0,
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
        try {
            await addPet(newValues);
            Toast.show({
                type: 'success',
                text1: 'Mascota registrada exitosamente'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error al registrar la mascota'
            });
        }
    };

    return {
        initialValues,
        validationSchema,
        onSubmit
    };
};
