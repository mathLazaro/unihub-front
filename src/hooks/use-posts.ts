import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getFeed, getPostById, updatePost } from "../api/posts.api";
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
                queryKey: ['posts', 'feed'],
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
                queryKey: ['posts', 'feed'],
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
                queryKey: ['posts', 'feed'],
            });
        },
    });
}

export function useFeed() {
    const query = useInfiniteQuery({
        queryKey: ["feed"],
        queryFn: ({ pageParam = 0 }) => getFeed(pageParam),
        getNextPageParam: (lastPage) =>
            lastPage.has_more ? lastPage.next_offset : undefined,
        initialPageParam: 0,
    });

    const posts = query.data?.pages.flatMap((page) => page.data) ?? [];

    return { ...query, posts };
}