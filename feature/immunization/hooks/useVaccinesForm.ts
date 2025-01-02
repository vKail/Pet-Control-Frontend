import { z } from 'zod';
import { IVaccines } from '../model/IVaccines';
import Toast from 'react-native-toast-message';
import { useVaccineStore } from '../context/use-vaccines-store';

export const useVaccinesForm = (petId: number, currentVaccine?: Partial<IVaccines>) => {
    const { addVaccine, updateVaccine } = useVaccineStore();

    const initialValues: Omit<IVaccines, 'id'> = {
        petId: petId,
        vaccine: currentVaccine?.vaccine || '',
        date: currentVaccine?.date || new Date().toISOString().split('T')[0],
    };

    const validationSchema = z.object({
        petId: z.number().min(1, 'El ID de la mascota es requerido'),
        vaccine: z.string()
            .min(1, 'El nombre de la vacuna es requerido')
            .max(100, 'El nombre de la vacuna no puede exceder los 100 caracteres'),
        date: z.string()
            .min(1, 'La fecha es requerida')
            .refine((date) => {
                const selectedDate = new Date(date);
                const today = new Date();
                return selectedDate <= today;
            }, 'La fecha debe ser mayor o igual a la fecha actual'),
    });

    const onSubmit = async (values: Omit<IVaccines, 'id'>, petId : number) => {
        const newValues = {
            ...values,
            petId: petId
        };
        try {
            if (currentVaccine?.id) {
                await updateVaccine({
                    id: currentVaccine.id,
                    ...newValues
                });
            } else {
                await addVaccine(newValues);
            }

            Toast.show({
                type: 'success',
                text1: 'Éxito',
                text2: currentVaccine?.id 
                    ? 'Vacuna actualizada correctamente' 
                    : 'Vacuna registrada correctamente'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Hubo un problema al procesar la vacuna'
            });
        }
    };

    return {
        initialValues,
        validationSchema,
        onSubmit
    };
};