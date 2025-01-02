import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Toast from 'react-native-toast-message';
import { ISpecie } from '../models/ISpecie';
import { SpecieDataSourceImpl } from '../service/SpecieDataSource';
import { State } from 'expo-router/build/fork/getPathFromState';

interface SpecieStore {
    species: ISpecie[];
    loading: boolean;
    error: string;
    fetchAllSpecies: () => void;
}

export const useSpecieStore = create<SpecieStore>()(
    persist(
        (set, get) => ({
            species: [],
            loading: false,
            error: '',
            fetchAllSpecies: async () => {
                set({ loading: true });
                try {
                    const species = await SpecieDataSourceImpl.getInstance().getAllSpecies();
                    set({ species: species, loading: false });
                } catch (error) {
                    set({ error: 'error fetching species', loading: false });
                }
            },
        }),
        {
            name: 'specie-store',
        }
    ) as StateCreator<SpecieStore>
);

