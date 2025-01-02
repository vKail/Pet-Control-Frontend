import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { ILogin } from "../models/ILogin";
import { IRegister } from "../models/IRegister";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";

interface DataSource {
    register(data: IRegister): Promise<IRegister>;
    login(data: ILogin): Promise<ILogin>;
    logout(): Promise<void>
}

export class AuthDataSourceImpl implements DataSource {
    private htpClient: HttpHandler;
    constructor() {
        this.htpClient = AxiosClient.getInstance();
    }
    async register(data: IRegister): Promise<IRegister> {
        const response = await this.htpClient.post<IRegister>('/user', data);
        return response;
    }

    async login(data: ILogin): Promise<ILogin> {
        const response = await this.htpClient.post<ILogin>('/login', data);
        return response;
    }

    async logout(): Promise<void> {
        return;
    }
}