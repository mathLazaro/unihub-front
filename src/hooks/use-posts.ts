import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  getFeed,
  getPostById,
  updatePost,
} from "../api/posts.api";
import type { UpdatePostDto } from "../core/post/api-post.dto";
import { toast } from "sonner";

const FEED_KEY = ["feed"];

export function usePost(id: string) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });
}

export function useFeed(types?: string[], q?: string, authorId?: string) {
  const query = useInfiniteQuery({
    queryKey: [...FEED_KEY, types, q, authorId],
    queryFn: ({ pageParam = 0 }) => getFeed(pageParam, 10, types, q, authorId),
    getNextPageParam: (lastPage) =>
      lastPage.has_more ? lastPage.next_offset : undefined,
    initialPageParam: 0,
  });

  const posts = query.data?.pages.flatMap((page) => page.data) ?? [];
  return { ...query, posts };
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      toast.success("Post criado");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueriesData({ queryKey: FEED_KEY }, (old: any) => {
        if (!old || !old.pages) return old;
        const firstPage = old.pages[0];
        return {
          ...old,
          pages: [
            { ...firstPage, data: [newPost, ...firstPage.data] },
            ...old.pages.slice(1),
          ],
        };
      });
    },
    onError: () => {
      toast.error("Erro ao criar o post");
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostDto }) =>
      updatePost(id, data),
    onSuccess: (updatedPost, { id }) => {
      toast.success("Post atualizado");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueriesData({ queryKey: FEED_KEY }, (old: any) => {
        if (!old || !old.pages) return old;
        return {
          ...old,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pages: old.pages.map((page: any) => ({
            ...page,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: page.data.map((post: any) =>
              post.id === id ? { ...post, ...updatedPost } : post,
            ),
          })),
        };
      });
      queryClient.setQueryData(["posts", id], updatedPost);
    },
    onError: () => {
      toast.error("Erro ao atualizar o post");
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_, id) => {
      toast.success("Post deletado");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueriesData({ queryKey: FEED_KEY }, (old: any) => {
        if (!old || !old.pages) return old;
        return {
          ...old,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pages: old.pages.map((page: any) => ({
            ...page,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: page.data.filter((post: any) => post.id !== id),
          })),
        };
      });
    },
    onError: () => {
      toast.error("Erro ao deletar o post");
    },
  });
}
