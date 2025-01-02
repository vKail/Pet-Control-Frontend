import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Toast from 'react-native-toast-message';
import { IPet, IPetResponse } from '../models/IPet';
import { PetDataSourceImpl } from '../service/PetDataSource';

interface PetStore {
    pets: IPetResponse[];
    loading: boolean;
    error: string;
    fetchPetsByOwner: (ownerId: number) => Promise<void>;
    addPet: (pet: IPet) => Promise<void>;
    updatePet: (id: number, pet: Partial<IPet>) => Promise<void>;
    deletePet: (id: number) => Promise<void>;
}

export const usePetStore = create<PetStore>()(
    persist(
        (set, get) => ({
            pets: [],
            loading: false,
            error: '',
            fetchPetsByOwner: async (ownerId: number) => {
                set({ loading: true });
                try {
                    const pets = await PetDataSourceImpl.getInstance().getPetsByOwnerId(ownerId);
                    set({ pets, loading: false });
                } catch (error) {
                    set({ error: 'Error fetching pets', loading: false });
                }
            },
            addPet: async (pet: IPet) => {
                set({ loading: true });
                try {
                    const newPet = await PetDataSourceImpl.getInstance().createPet(pet);
                    set({ pets: [...get().pets, newPet], loading: false });
                    Toast.show({
                        type: 'success',
                        text1: 'Mascota agregada exitosamente'
                    });
                } catch (error) {
                    set({ error: 'Error adding pet', loading: false });
                }
            },
            updatePet: async (id: number, pet: Partial<IPet>) => {
                set({ loading: true });
                try {
                    const updatedPet = await PetDataSourceImpl.getInstance().updatePet(id, pet);
                    const updatedPets = get().pets.map(p => 
                        p.id === id ? updatedPet : p
                    );
                    set({ pets: updatedPets, loading: false });
                } catch (error) {
                    set({ error: 'Error updating pet', loading: false });
                }
            },
            deletePet: async (id: number) => {
                set({ loading: true });
                try {
                    await PetDataSourceImpl.getInstance().deletePet(id);
                    set({ 
                        pets: get().pets.filter(p => p.id !== id), 
                        loading: false 
                    });
                } catch (error) {
                    set({ error: 'Error deleting pet', loading: false });
                }
            }
        }),
        {
            name: 'pet-store',
        }
    )
);
