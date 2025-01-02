import { ISpecie } from "@/feature/specie/models/ISpecie";

export interface IPet {
    name: string;
    birthDate: string;
    gender: string;
    specieId: number;
    ownerId: number;
}

export interface IPetResponse {
    id: number;
    name: string;
    birthDate: string;
    gender: string;
    specie: ISpecie;
    ownerId: number;
}
