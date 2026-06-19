import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  open,
  onOpenChange,
  children,
  maxWidth = "50vw",
}: ModalProps) {
  const maxWidthTemplate = maxWidth ? `max-w-[${maxWidth}]` : "";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          className={`p-5 pt-15 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-surface shadow-primary z-50 p-4 ${maxWidthTemplate}`}
        >
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 text-text-muted hover:text-text">
              <XIcon size={20} />
            </button>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
