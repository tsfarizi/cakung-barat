import { HttpClient } from '../api/dao/http-client';
import type {
    AllAssetsResponse,
    Asset,
    UploadAssetRequest
} from '../api/dto/posting.dto';

class AssetService extends HttpClient {
    constructor() {
        super();
    }

    public async getAllAssets(): Promise<AllAssetsResponse> {
        return this.get<AllAssetsResponse>('/api/assets');
    }

    public async getAssetById(id: string): Promise<Asset> {
        return this.get<Asset>(`/api/assets/${id}`);
    }

    public async uploadAsset(request: UploadAssetRequest): Promise<Asset> {
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

        return this.post<Asset>('/api/assets', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    public async uploadAssetToPost(postId: string, request: UploadAssetRequest): Promise<Asset> {
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

        return this.post<Asset>(`/api/assets/posts/${postId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    public async getAssetsByIds(ids: string[]): Promise<Asset[]> {
        return this.post<Asset[]>('/api/assets/by-ids', { ids });
    }

    public async createFolder(folderName: string): Promise<void> {
        return this.post<void>('/api/assets/folders', { folder_name: folderName });
    }

    public async listFolder(folderName: string): Promise<Asset[]> {
        return this.get<Asset[]>(`/api/assets/folders/${encodeURIComponent(folderName)}`);
    }

    public async deleteAsset(id: string): Promise<void> {
        return this.delete<void>(`/api/assets/${id}`);
    }
}

export const assetService = new AssetService();
