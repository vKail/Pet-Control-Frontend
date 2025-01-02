import { IPet } from "@/feature/pet/models/IPet";

export interface IVaccines {
    id: number;
    petId: number;
    vaccine: string;
    date: string;
}

export interface IVaccinesResponse {
    id: number;
    pet: IPet;
    vaccine: string;
    date: string;
}