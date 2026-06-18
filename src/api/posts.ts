import type { CreatePostDto, UpdatePostDto } from "../core/post/api-post.dto";
import type { Post } from "../core/post/post.model";
import { api } from "./clients";

export async function getPostById(id: string): Promise<Post> {
    const response = await api.post(`/post/${id}`);
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
