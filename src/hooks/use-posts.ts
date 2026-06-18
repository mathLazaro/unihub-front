import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPostById, updatePost } from "../api/posts";
import type { UpdatePostDto } from "../core/post/api-post.dto";

export function usePost(id: string) {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPostById(id),
    });
}

export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        },
    });
}

export function useUpdatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdatePostDto;
        }) => updatePost(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        },
    });
}

export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdatePostDto;
        }) => updatePost(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        },
    });
}