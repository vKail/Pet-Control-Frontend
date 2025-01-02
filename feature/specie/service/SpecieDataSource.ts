import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { ISpecie } from "../models/ISpecie";

interface ISpecieDataSource {
    getAllSpecies(): Promise<ISpecie[]>;
}

export class SpecieDataSourceImpl implements ISpecieDataSource {
    private static instance: SpecieDataSourceImpl;
    private httpClient: HttpHandler;

    private constructor() {
        this.httpClient = AxiosClient.getInstance();
    }

    public static getInstance(): SpecieDataSourceImpl {
        if (!SpecieDataSourceImpl.instance) {
            SpecieDataSourceImpl.instance = new SpecieDataSourceImpl();
        }
        return SpecieDataSourceImpl.instance;
    }

    async getAllSpecies(): Promise<ISpecie[]> {
        return this.httpClient.get<ISpecie[]>('/specimens');
    }
}