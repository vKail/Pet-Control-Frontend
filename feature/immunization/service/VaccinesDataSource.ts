import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { IVaccines, IVaccinesResponse } from "../model/IVaccines";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";

interface DataSource {
    getVaccinesByPetId(petId: number): Promise<IVaccinesResponse[]>;
    addVaccine(vaccine: Omit<IVaccines, 'id'>): Promise<IVaccinesResponse>;
    updateVaccine(vaccine: IVaccines): Promise<IVaccinesResponse>;
    deleteVaccine(vaccineId: number): Promise<void>;
}


export class VaccinesDataSourceImpl implements DataSource {

    private httpClient: HttpHandler;

    constructor(){
        this.httpClient = AxiosClient.getInstance();
    }

    async getVaccinesByPetId(petId: number): Promise<IVaccinesResponse[]> {
        const response = await this.httpClient.get<IVaccinesResponse[]>(`/immunization/pet/${petId}`);
        return response;
    }

    async addVaccine(vaccine: Omit<IVaccines, 'id'>): Promise<IVaccinesResponse> {
        const response = await this.httpClient.post<IVaccinesResponse>('/immunization', vaccine);
        return response;
    }

    async updateVaccine(vaccine: IVaccines): Promise<IVaccinesResponse> {
        const response = await this.httpClient.put<IVaccinesResponse>(`/immunization/${vaccine.id}`, vaccine);
        return response;
    }

    async deleteVaccine(vaccineId: number): Promise<void> {
        await this.httpClient.delete(`/immunization/${vaccineId}`);
    }

    static getInstance(): DataSource {
        return new VaccinesDataSourceImpl();
    }

}