import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { IPet, IPetResponse } from "@/feature/pet/models/IPet";

interface IPetDataSource {
    getPetsByOwnerId(ownerId: number): Promise<IPetResponse[]>;
    createPet(pet: IPet): Promise<IPetResponse>;
    updatePet(id: number, pet: Partial<IPet>): Promise<IPetResponse>;
    deletePet(id: number): Promise<void>;
}

export class PetDataSourceImpl implements IPetDataSource {
    private static instance: PetDataSourceImpl;
    private httpClient: HttpHandler;

    private constructor() {
        this.httpClient = AxiosClient.getInstance();
    }

    public static getInstance(): PetDataSourceImpl {
        if (!PetDataSourceImpl.instance) {
            PetDataSourceImpl.instance = new PetDataSourceImpl();
        }
        return PetDataSourceImpl.instance;
    }

    async getPetsByOwnerId(ownerId: number): Promise<IPetResponse[]> {
        return this.httpClient.get<IPetResponse[]>(`/pets/owner/${ownerId}`);
    }

    async createPet(pet: IPet): Promise<IPetResponse> {
        return this.httpClient.post<IPetResponse>('/pets', pet);
    }

    async updatePet(id: number, pet: Partial<IPet>): Promise<IPetResponse> {
        return this.httpClient.put<IPetResponse>(`/pets/${id}`, pet);
    }

    async deletePet(id: number): Promise<void> {
        return this.httpClient.delete<void>(`/pets/${id}`);
    }
}