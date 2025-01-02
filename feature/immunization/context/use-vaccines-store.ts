import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Toast from 'react-native-toast-message';
import { IVaccines, IVaccinesResponse } from '../model/IVaccines';
import { VaccinesDataSourceImpl } from '../service/VaccinesDataSource';

interface VaccineStore {
    vaccines: IVaccinesResponse[];
    loading: boolean;
    error: string;
    fetchVaccinesByPetId: (petId: number) => Promise<void>;
    addVaccine: (vaccine: Omit<IVaccines, 'id'>) => Promise<void>;
    updateVaccine: (vaccine: IVaccines) => Promise<void>;
    deleteVaccine: (vaccineId: number) => Promise<void>;
}

export const useVaccineStore = create<VaccineStore>()(
    persist(
        (set, get) => ({
            vaccines: [],
            loading: false,
            error: '',

            fetchVaccinesByPetId: async (petId: number) => {
                set({ loading: true });
                try {
                    const vaccines = await VaccinesDataSourceImpl.getInstance().getVaccinesByPetId(petId);
                    set({ vaccines, loading: false });
                } catch (error) {
                    set({ error: 'Error fetching vaccines', loading: false });
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'No se pudieron cargar las vacunas'
                    });
                }
            },

            addVaccine: async (vaccine: Omit<IVaccines, 'id'>) => {
                set({ loading: true });
                try {
                    const newVaccine = await VaccinesDataSourceImpl.getInstance().addVaccine(vaccine);
                    set({ 
                        vaccines: [...get().vaccines, newVaccine],
                        loading: false 
                    });
                    Toast.show({
                        type: 'success',
                        text1: 'Éxito',
                        text2: 'Vacuna agregada correctamente'
                    });
                } catch (error) {
                    set({ error: 'Error adding vaccine', loading: false });
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'No se pudo agregar la vacuna'
                    });
                }
            },

            updateVaccine: async (vaccine: IVaccines) => {
                set({ loading: true });
                try {
                    const updatedVaccine = await VaccinesDataSourceImpl.getInstance().updateVaccine(vaccine);
                    const updatedVaccines = get().vaccines.map(v => 
                        v.id === vaccine.id ? updatedVaccine : v
                    );
                    set({ 
                        vaccines: updatedVaccines,
                        loading: false 
                    });
                    Toast.show({
                        type: 'success',
                        text1: 'Éxito',
                        text2: 'Vacuna actualizada correctamente'
                    });
                } catch (error) {
                    set({ error: 'Error updating vaccine', loading: false });
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'No se pudo actualizar la vacuna'
                    });
                }
            },

            deleteVaccine: async (vaccineId: number) => {
                set({ loading: true });
                try {
                    await VaccinesDataSourceImpl.getInstance().deleteVaccine(vaccineId);
                    set({ 
                        vaccines: get().vaccines.filter(v => v.id !== vaccineId),
                        loading: false 
                    });
                    Toast.show({
                        type: 'success',
                        text1: 'Éxito',
                        text2: 'Vacuna eliminada correctamente'
                    });
                } catch (error) {
                    set({ error: 'Error deleting vaccine', loading: false });
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'No se pudo eliminar la vacuna'
                    });
                }
            }
        }),
        {
            name: 'vaccine-store',
        }
    )
);