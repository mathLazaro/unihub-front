import type { ViewFeedDto } from "../../core/feed/feed-response.dto";
import { POST_TYPE, POST_TYPE_COLORS } from "../../core/post/post-type.enum";
import { timeAgo } from "../../utils/time-utils";
import PostCardButton from "./PostCardButton";

export function PostCard({ data }: { data: ViewFeedDto }) {
  const authorName = data.author?.name || "";
  const createdAt = timeAgo(new Date(data.createdAt));
  const location = data.location;
  const content = data.content || "";
  const expiresAt = data.expiresAt;
  const contact = data.contactInfo;
  const postType = Object(POST_TYPE)[data.type];
  const postTypeColor = Object(POST_TYPE_COLORS)[data.type];

  return (
    <div className="wrapper-container bg-surface p-4 flex flex-col gap-3 shadow-primary">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="w-full flex justify-between">
            <h3 className="font-semibold text-xl">{authorName}</h3>
            <PostCardButton
              onEdit={() => {}}
              onDelete={() => {}}
              onEnterUser={() => {}}
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
          <span>⏳ até {new Date(expiresAt).toLocaleDateString("pt-BR")}</span>
        )}
        {contact && <span>📞 {contact}</span>}
      </div>
    </div>
  );
}
