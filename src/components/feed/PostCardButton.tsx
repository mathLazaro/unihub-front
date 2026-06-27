import { DotsThreeIcon } from "@phosphor-icons/react";
import { useRef, useEffect, useState } from "react";

interface PostCardButtonProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onEnterUser?: () => void;
}

export default function PostCardButton({
  onEdit,
  onDelete,
  onEnterUser,
}: PostCardButtonProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <DotsThreeIcon size={32} weight="bold" />
      </button>

      {open && (
        <div className="absolute right-0 w-30 bg-surface shadow-primary z-10 overflow-hidden">
          {onEnterUser && (
            <button
              onClick={() => {
                onEnterUser();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-50 transition-colors"
            >
              Ver perfil
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-50 transition-colors"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-primary-50 transition-colors"
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
}
