import { useEffect, useRef } from "react";
import { PostCard } from "./PostCard";
import { useFeed } from "../../hooks/use-posts";
import { CircleNotchIcon } from "@phosphor-icons/react";

export function Feed() {
  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFeed();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <p className="text-center text-text-muted py-10">Carregando feed...</p>
    );

  if (isError)
    return (
      <p className="text-center text-danger py-10">Erro ao carregar o feed.</p>
    );

  if (posts.length === 0)
    return (
      <p className="text-center text-text-muted py-10">
        Nenhum post por aqui ainda.
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}

      <div ref={sentinelRef} className="h-1" />

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <CircleNotchIcon
            className="animate-spin"
            size={32}
            style={{ animationDuration: "2s" }}
          />
        </div>
      )}

      {!hasNextPage && (
        <p className="text-center text-text-muted text-sm py-4">
          Você chegou ao fim do feed 🎉
        </p>
      )}
    </div>
  );
}
