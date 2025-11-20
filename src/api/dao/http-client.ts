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

        console.log('[HTTP] HttpClient initialized with baseURL:', baseURL);

        // Add request interceptor
        this.instance.interceptors.request.use(
            (config) => {
                console.log('[HTTP] 📤 Request:', {
                    method: config.method?.toUpperCase(),
                    url: config.url,
                    baseURL: config.baseURL,
                    fullURL: `${config.baseURL}${config.url}`
                });
                return config;
            },
            (error) => {
                console.error('[HTTP] ❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            (response) => {
                console.log('[HTTP] 📥 Response:', {
                    status: response.status,
                    url: response.config.url,
                    dataType: typeof response.data,
                    dataLength: Array.isArray(response.data) ? response.data.length : 'N/A'
                });
                return this.handleResponse(response);
            },
            (error) => {
                console.error('[HTTP] ❌ Response Error:', {
                    url: error.config?.url,
                    status: error.response?.status,
                    message: error.message,
                    data: error.response?.data
                });
                return this.handleError(error);
            }
        );
    }



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
