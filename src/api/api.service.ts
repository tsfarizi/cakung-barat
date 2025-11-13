import axios, { type AxiosInstance } from 'axios';
import type {
  AllAssetsResponse,
  Asset,
  CreatePostingRequest,
  Post,
  UpdatePostingRequest,
  UploadAssetRequest
} from './dto/posting.dto';

class ApiService {
  private apiClient: AxiosInstance;

  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';
    
    this.apiClient = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getAllAssets(): Promise<AllAssetsResponse> {
    const response = await this.apiClient.get('/api/assets');
    return response.data;
  }

  async getAssetById(id: string): Promise<Asset> {
    const response = await this.apiClient.get(`/api/assets/${id}`);
    return response.data;
  }

  async uploadAsset(request: UploadAssetRequest): Promise<Asset> {
    const formData = new FormData();
    formData.append('file', request.file);
    
    if (request.folders) {
      request.folders.forEach(folder => {
        formData.append('folders', folder);
      });
    }
    
    if (request.name) {
      formData.append('name', request.name);
    }
    
    if (request.posting_id) {
      formData.append('posting_id', request.posting_id);
    }

    const response = await this.apiClient.post('/api/assets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getAssetsByIds(ids: string[]): Promise<Asset[]> {
    const response = await this.apiClient.post('/api/assets/by-ids', { ids });
    return response.data;
  }

  async createFolder(folderName: string): Promise<void> {
    await this.apiClient.post('/api/assets/folders', { folder_name: folderName });
  }

  async listFolder(folderName: string): Promise<Asset[]> {
    const response = await this.apiClient.get(`/api/assets/folders/${encodeURIComponent(folderName)}`);
    return response.data;
  }

  async deleteAsset(id: string): Promise<void> {
    await this.apiClient.delete(`/api/assets/${id}`);
  }

  async getAllPostings(): Promise<Post[]> {
    const response = await this.apiClient.get('/api/postings');
    return response.data;
  }

  async getPostingById(id: string): Promise<Post> {
    const response = await this.apiClient.get(`/api/postings/${id}`);
    return response.data;
  }

  async createPosting(request: CreatePostingRequest): Promise<Post> {
    const response = await this.apiClient.post('/api/postings', request);
    return response.data;
  }

  async updatePosting(id: string, request: UpdatePostingRequest): Promise<Post> {
    const response = await this.apiClient.put(`/api/postings/${id}`, request);
    return response.data;
  }

  async deletePosting(id: string): Promise<void> {
    await this.apiClient.delete(`/api/postings/${id}`);
  }
}

export const apiService = new ApiService();