import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { ViewFeedDto } from "../../core/feed/feed-response.dto";
import { POST_TYPE, POST_TYPE_COLORS } from "../../core/post/post-type.enum";
import { timeAgo } from "../../utils/time-utils";
import PostCardButton from "./PostCardButton";
import { useDeletePost, useUpdatePost } from "../../hooks/use-posts";
import { Modal } from "../Modal";
import PostInput from "../post/input/PostInput";
import { useNavigate } from "react-router-dom";

export function PostCard({ data }: { data: ViewFeedDto }) {
  const navigate = useNavigate();
  const authorName = data.author?.name || "";
  const createdAt = timeAgo(new Date(data.createdAt));
  const location = data.location;
  const content = data.content || "";
  const expiresAt = data.expiresAt;
  const contact = data.contactInfo;
  const postType = Object(POST_TYPE)[data.type];
  const postTypeColor = Object(POST_TYPE_COLORS)[data.type];
  const { user, isAuthenticated } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();
  const isAuthor = isAuthenticated && user?.id === data.author?.id;

  return (
    <>
      <div className="wrapper-container bg-surface p-4 flex flex-col gap-3 shadow-primary">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 flex flex-col gap-3">
            <h3 className="font-semibold text-xl cursor-pointer hover:underline" onClick={() => data.author?.id && navigate(`/user/${data.author.id}`)}>
              {authorName}
            </h3>
            <div className="absolute right-1">
              <PostCardButton
                onEdit={isAuthor ? () => setEditOpen(true) : undefined}
                onDelete={isAuthor? () => {deletePost(data.id);}: undefined}
                onEnterUser={data.author?.id ? () => navigate(`/user/${data.author.id}`) : undefined}
              />
            </div>

            <span className="flex gap-3 items-center">
              <span
                className={`p-1 px-3 text-white font-semibold text-sm rounded-full ${postTypeColor}`}
              >
                {postType}
              </span>
              <p className="text-base text-text-muted">{createdAt}</p>
            </span>
          </div>
        </div>

        <p className="text-lg">{content}</p>

        <div className="flex items-center gap-4 text-text-muted text-sm">
          {location && <span>📍 {location}</span>}
          {expiresAt && (
            <span>
              ⏳ até {new Date(expiresAt).toLocaleDateString("pt-BR")}
            </span>
          )}
          {contact && <span>📞 {contact}</span>}
        </div>
      </div>
      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <PostInput
          mode="modal"
          initialData={data}
          onCancel={() => setEditOpen(false)}
          onSubmit={(updated) => {
            updatePost(
              { id: data.id, data: updated },
              { onSuccess: () => setEditOpen(false) },
            );
          }}
        />
      </Modal>
    </>
  );
}
