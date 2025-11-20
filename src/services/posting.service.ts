import { HttpClient } from '../api/dao/http-client';
import type { Post } from '../api/dto/posting.dto';

class PostingService extends HttpClient {
    constructor() {
        super();
    }

    public async getAllPostings(page: number = 1, limit: number = 20): Promise<Post[]> {
        return this.get<Post[]>(`/api/postings?page=${page}&limit=${limit}`);
    }

    public async getPostingById(id: string): Promise<Post> {
        return this.get<Post>(`/api/postings/${id}`);
    }
}

export const postingService = new PostingService();
