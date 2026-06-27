import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicProfile } from "../api/users.api";
import { Feed } from "../components/feed/Feed";
import { UserCircleIcon, GraduationCapIcon } from "@phosphor-icons/react";
import type { ViewUserDto } from "../core/user/view-user.dto";

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<ViewUserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPublicProfile(id)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Carregando perfil...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Usuário não encontrado.</p>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-4">
      <div className="bg-surface p-8 rounded shadow-primary flex flex-col items-center justify-center text-center gap-4">
        <UserCircleIcon size={80} className="text-blue-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.nome}</h2>
          <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full mt-2 inline-block">
            {user.tipo}
          </span>
        </div>
        
        {(user.universidade || user.curso) && (
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <GraduationCapIcon size={20} />
            <span>
              {user.curso} {user.curso && user.universidade && " - "} {user.universidade}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-4">Posts de {user.nome}</h3>
        <Feed authorId={id} />
      </div>
    </div>
  );
}
