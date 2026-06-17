import { UserCircleIcon } from "@phosphor-icons/react";
import PostInput from "../components/post/input/PostInput";

export default function HomePage() {
  return (
    <>
      <div className="grid grid-cols-3 gap-5 ">
        <aside className="wrapper-container hidden md:flex">
          <p>USER INFO</p>
        </aside>

        <span className="fixed top-3 left-3 md:hidden">
          <UserCircleIcon size={50} weight="fill" color="#457ccb" />
        </span>

        <article className="feed col-span-3 md:col-span-2">
          <div className="wrapper-container">
            <PostInput
              onSubmit={(message: string) => {
                console.log(message);
              }}
            />
          </div>
        </article>
      </div>
    </>
  );
}
