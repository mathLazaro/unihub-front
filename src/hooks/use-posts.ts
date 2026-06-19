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

export function useFeed() {
  const query = useInfiniteQuery({
    queryKey: FEED_KEY,
    queryFn: ({ pageParam = 0 }) => getFeed(pageParam),
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
      queryClient.setQueryData(FEED_KEY, (old: any) => {
        if (!old) return old;
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
      queryClient.setQueryData(FEED_KEY, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
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
      queryClient.setQueryData(FEED_KEY, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
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
