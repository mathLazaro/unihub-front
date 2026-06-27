import { UserCircleIcon, FadersIcon } from "@phosphor-icons/react";
import PostInput from "../components/post/input/PostInput";
import { useCreatePost } from "../hooks/use-posts";
import type { CreatePostDto } from "../core/post/api-post.dto";
import { Feed } from "../components/feed/Feed";
import { useEffect, useState } from "react";
import { getSubscriptions, updateSubscriptions } from "../api/users.api";
import { useAuth } from "../contexts/AuthContext";
import { UserInfoWidget } from "../components/user/UserInfoWidget";
import { POST_TYPE } from "../core/post/post-type.enum";

const POST_TYPES = Object.keys(POST_TYPE);

export default function HomePage() {
  const { mutate: createPost } = useCreatePost();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [isEditingSubs, setIsEditingSubs] = useState(false);
  const [draftSubs, setDraftSubs] = useState<string[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    getSubscriptions().then((subs) => {
      setSubscriptions(subs);
      setSelectedTypes(subs.length > 0 ? subs : []);
    }).catch(console.error);
  }, []);

  const toggleFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const openSubsModal = () => {
    setDraftSubs(subscriptions);
    setIsEditingSubs(true);
  };

  const saveSubs = async () => {
    try {
      await updateSubscriptions(draftSubs);
      setSubscriptions(draftSubs);
      setIsEditingSubs(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-5 ">
        <aside className="hidden h-50 md:flex flex-col gap-4">
          <UserInfoWidget />
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
          <div className="wrapper-container flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Filtros do Feed</h3>
              <button onClick={openSubsModal} className="text-blue-500 text-sm flex items-center gap-1">
                <FadersIcon size={16} /> Gerenciar Assinaturas
              </button>
            </div>
            
            {/* Filters */}
            <nav className="flex flex-wrap gap-2" aria-label="Filtros do Feed">
              {POST_TYPES.map((pt) => (
                <button
                  key={pt}
                  onClick={() => toggleFilter(pt)}
                  aria-pressed={selectedTypes.includes(pt)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    selectedTypes.includes(pt)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {POST_TYPE[pt as keyof typeof POST_TYPE]}
                </button>
              ))}
              {selectedTypes.length > 0 && (
                <button onClick={() => setSelectedTypes([])} className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Limpar
                </button>
              )}
            </nav>

            {/* Subscriptions Modal/Inline Area */}
            {isEditingSubs && (
              <div className="mt-4 p-4 border rounded bg-gray-50">
                <h4 className="font-semibold mb-2">Minhas Assinaturas</h4>
                <p className="text-xs text-gray-500 mb-3">Selecione os tópicos que deseja seguir no seu feed.</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {POST_TYPES.map((pt) => (
                    <label key={pt} className="flex items-center gap-1 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftSubs.includes(pt)}
                        onChange={(e) => {
                          setDraftSubs(prev => e.target.checked ? [...prev, pt] : prev.filter(t => t !== pt))
                        }}
                      />
                      {POST_TYPE[pt as keyof typeof POST_TYPE]}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={saveSubs} className="px-3 py-1 bg-blue-600 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">Salvar</button>
                  <button onClick={() => setIsEditingSubs(false)} className="px-3 py-1 bg-gray-300 text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">Cancelar</button>
                </div>
              </div>
            )}
          </div>
          <Feed types={selectedTypes.length > 0 ? selectedTypes : undefined} />
        </article>
      </div>
    </>
  );
}
