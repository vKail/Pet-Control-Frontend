import { useVaccineStore } from "../context/use-vaccines-store";

export const useVaccinesView = () => {
    const { deleteVaccine } = useVaccineStore();
    
    
    
    const handleDelete = async (vaccineId: number) => {
        await deleteVaccine(vaccineId);
    };
    
    return {
        handleDelete,
    };
    }