import { HttpClient } from '../api/dao/http-client';
import type {
    Post,
    CreatePostingRequest,
    UpdatePostingRequest
} from '../api/dto/posting.dto';

class PostingService extends HttpClient {
    constructor() {
        super();
    }

    public async getAllPostings(): Promise<Post[]> {
        return this.get<Post[]>('/api/postings');
    }

    public async getPostingById(id: string): Promise<Post> {
        return this.get<Post>(`/api/postings/${id}`);
    }

    public async createPosting(request: CreatePostingRequest): Promise<Post> {
        return this.post<Post>('/api/postings', request);
    }

    public async updatePosting(id: string, request: UpdatePostingRequest): Promise<Post> {
        return this.put<Post>(`/api/postings/${id}`, request);
    }

    public async deletePosting(id: string): Promise<void> {
        return this.delete<void>(`/api/postings/${id}`);
    }
}

export const postingService = new PostingService();
