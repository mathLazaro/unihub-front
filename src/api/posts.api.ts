import type { FeedResponse } from "../core/feed/feed-response.dto";
import type { CreatePostDto, UpdatePostDto } from "../core/post/api-post.dto";
import type { Post } from "../core/post/post.model";
import { api } from "./clients";

export async function getPostById(id: string): Promise<Post> {
    const response = await api.get(`/post/${id}`);
    return response.data;
}

export async function createPost(data: CreatePostDto): Promise<Post> {
    const response = await api.post('/post', data);
    return response.data;
}

export async function updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    const response = await api.put(`/post/${id}`, data);
    return response.data;
}

export async function deletePost(id: string): Promise<void> {
    const response = await api.delete(`/post/${id}`);
    return response.data;
}

export async function getFeed(offset: number, limit = 10, types?: string[], q?: string, authorId?: string): Promise<FeedResponse> {
    let url = `/post/feed?offset=${offset}&limit=${limit}`;
    if (types && types.length > 0) {
        url += `&types=${types.join(',')}`;
    }
    if (q) {
        url += `&q=${encodeURIComponent(q)}`;
    }
    if (authorId) {
        url += `&authorId=${authorId}`;
    }
    const response = await api.get(url);
    return response.data;
}