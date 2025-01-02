import { VaccineEditView } from "@/feature/immunization/presentation/view/vaccine-update-view"
import { useLocalSearchParams } from "expo-router";

const EditVaccinePage = () => {
  const { vaccineId } = useLocalSearchParams<{ id: string; vaccineId: string }>();

    return (
        <VaccineEditView vaccineId={Number(vaccineId)}/>
    )
}

export default EditVaccinePage