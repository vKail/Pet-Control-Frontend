import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { HTTP_STATUS_CODES } from "@/core/providers/HttpStatusCodes";
import { getToken } from "@/core/providers/TokenUtils";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import SessionStorage from 'react-native-session-storage';

export class AxiosClient implements HttpHandler {
  private static instance: AxiosClient;
  private axiosInstance: AxiosInstance;
  private static readonly baseUrl: string = "http://192.168.1.14:8080";
  private static accessToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: AxiosClient.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token.replaceAll('"', "")}`;
        } else {
          // document.dispatchEvent(new CustomEvent("unauthorized"));
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (!["get"].includes(response.config.method || ""))
          Toast.show({
            type: "success",
            text1: "Operación exitosa",
            text2: "La operación se realizó correctamente",
          });
        return response;
      },
      (error) => {
        if (error.response) {
          const errors =
            error.response.data.status.message ||
            "Error desconocido";
            Toast.show({
              type: "error",
              text1: "Error",
              text2: errors,
            });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
        }
        if (error.response?.status === HTTP_STATUS_CODES.FORBIDDEN) {
          if (typeof window !== "undefined") {
            window.location.href = "/dashboard";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }

    return AxiosClient.instance;
  }

  public static setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    if (this.instance) {
      this.instance.axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = this.axiosInstance.get<T>(url, config);
    const response: AxiosResponse<T> = await promise;
    return response.data;
  }

  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const promise = this.axiosInstance.post<T>(url, data, config);
    const response: AxiosResponse<T> = await promise;
    return response.data;
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const promise = this.axiosInstance.put<T>(url, data, config);
    const response: AxiosResponse<T> = await promise;
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = this.axiosInstance.delete<T>(url, config);
    const response: AxiosResponse<T> = await promise;
    return response.data;
  }
}
