export interface AllAssetsResponse {
  folders: FolderWithAssets[];
}

export interface Asset {
  id: string;
  name: string;
  filename: string;
  url: string;
  created_at?: string | null;
  description?: string | null;
  updated_at?: string | null;
}

export interface FolderContent {
  name: string;
  is_file: boolean;
  size?: number | null;
}

export interface FolderWithAssets {
  name: string;
  assets: Asset[];
}

export interface CreatePostingRequest {
  title: string;
  category: string;
  excerpt: string;
}

export interface Posting {
  id: string;
  title: string;
  category: string;
  date: string | null;
  excerpt: string;
  asset_ids: string[];
  created_at?: string | null;
  updated_at?: string | null;
  folder_id?: string | null;
}

export interface PostingResponse {
  id: string;
  title: string;
  category: string;
  date: string | null;
  excerpt: string;
  asset_ids: string[];
  created_at?: string | null;
  updated_at?: string | null;
  folder_id?: string | null;
}

export interface UpdatePostingRequest {
  title?: string | null;
  category?: string | null;
  excerpt?: string | null;
  folder_id?: string | null;
}

export interface Post {
  id: string;
  title: string;
  category: string;
  date: string | null;
  excerpt: string;
  created_at?: string | null;
  updated_at?: string | null;
  folder_id?: string | null;
}

export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

export interface UploadAssetRequest {
  file: File;
  folders?: string[] | null;
  name?: string | null;
  posting_id?: string | null;
}

export interface GetAssetsByIdsRequest {
  ids: string[];
}

export interface CreateFolderRequest {
  folder_name: string;
}