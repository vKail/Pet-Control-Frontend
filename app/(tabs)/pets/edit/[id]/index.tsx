import { PetUpdateView } from "@/feature/pet/presentation/view/pet-update-view";
import { useLocalSearchParams } from "expo-router";


const EditPetPage = () => {
    const {id} = useLocalSearchParams();
    return (
        <PetUpdateView  id={Number(id)}/>
    );
    }

export default EditPetPage;