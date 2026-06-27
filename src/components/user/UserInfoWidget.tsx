import { UserCircleIcon } from "@phosphor-icons/react";
import { useAuth } from "../../contexts/AuthContext";

export function UserInfoWidget() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-surface rounded shadow-primary">
      <UserCircleIcon size={80} weight="fill" color="#457ccb" />
      <div className="text-center mt-2">
        <h3 className="font-semibold text-lg">Olá, {user?.name || "Usuário"}</h3>
        <p className="text-sm text-text-muted">{user?.email}</p>
      </div>
    </div>
  );
}
