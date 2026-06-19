import { UserCircleIcon } from "@phosphor-icons/react";
import PostInput from "../components/post/input/PostInput";
import { useCreatePost } from "../hooks/use-posts";
import type { CreatePostDto } from "../core/post/api-post.dto";
import { Feed } from "../components/feed/Feed";

export default function HomePage() {
  const { mutate: createPost } = useCreatePost();

  return (
    <>
      <div className="grid grid-cols-3 gap-5 ">
        <aside className="wrapper-container hidden h-50 md:flex">
          <p>USER INFO</p>
        </aside>

        <span className="fixed top-3 left-3 md:hidden">
          <UserCircleIcon size={50} weight="fill" color="#457ccb" />
        </span>

        <article className="flex flex-col gap-5 feed col-span-3 md:col-span-2">
          <div className="wrapper-container">
            <PostInput
              onSubmit={(data) => createPost({ ...data } as CreatePostDto)}
            />
          </div>
          <Feed />
        </article>
      </div>
    </>
  );
}
