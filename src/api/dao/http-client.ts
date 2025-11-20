import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

export class HttpClient {
    protected instance: AxiosInstance;

    constructor(baseURL: string = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080') {
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleError
        );
    };

    private handleResponse = ({ data }: AxiosResponse) => data;

    protected handleError = (error: any) => Promise.reject(error);

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get<T, T>(url, config);
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post<T, T>(url, data, config);
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.put<T, T>(url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.delete<T, T>(url, config);
    }
}
