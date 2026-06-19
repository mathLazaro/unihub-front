import { useState } from "react";
import Input from "../../input/Input";
import type { SelectOption } from "../../select/Select";
import Select from "../../select/Select";
import { POST_TYPE } from "../../../core/post/post-type.enum";
import type { Post } from "../../../core/post/post.model";
import Button from "../../button/Button";
import { AddressBookIcon, MapPinSimpleIcon } from "@phosphor-icons/react";

export interface PostInputProps {
  onSubmit: (post: Post) => void;
}

export default function PostInput({ onSubmit }: PostInputProps) {
  const typeOptions: SelectOption[] = Object.entries(POST_TYPE).map(
    ([key, label]) => ({
      value: key,
      label,
    }),
  );

  const defaultForm = {
    content: "",
    type: "",
  } as Post;

  const [inputMode, setInputMode] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const showLocation = ["EVENT", "SERVICE"].includes(form.type);
  const showContactInfo = ["SERVICE", "OPORTUNITY"].includes(form.type);
  const showExpiresAt = ["EVENT", "OPORTUNITY"].includes(form.type);
  const anyChangeOnLayout = showLocation || showContactInfo || showExpiresAt;
  const invalidForm = !form.content || !form.type;

  const buttonLayout = (
    <div className="flex gap-2">
      <Button
        styleButton="neutral"
        onClick={() => {
          setInputMode(false);
          setForm(defaultForm);
        }}
      >
        Cancelar
      </Button>

      <Button
        styleButton="primary"
        size="lg"
        onClick={() => {
          onSubmit(form);
          setForm(defaultForm);
          setInputMode(false);
        }}
        disabled={invalidForm}
      >
        Publicar
      </Button>
    </div>
  );

  const locationInput = (
    <Input
      name="location"
      placeholder="Localização"
      value={form.location || ""}
      onChange={(e) =>
        setForm((prev) => ({ ...prev, location: e.target.value }))
      }
      fontSize="base"
      icon={<MapPinSimpleIcon size={15} weight="fill" />}
      width="100%"
    />
  );

  const contactInput = (
    <Input
      name="contactInfo"
      placeholder="Contato"
      value={form.contactInfo || ""}
      onChange={(e) =>
        setForm((prev) => ({ ...prev, contactInfo: e.target.value }))
      }
      fontSize="base"
      icon={<AddressBookIcon size={15} />}
      width="100%"
    />
  );

  const expiresAtInput = (
    <Input
      name="expiresAt"
      type="date"
      placeholder="Localização"
      value={form.expiresAt || ""}
      onChange={(e) =>
        setForm((prev) => ({ ...prev, expiresAt: e.target.value }))
      }
      fontSize="sm"
    />
  );

  if (inputMode)
    return (
      <div className="input-wrapper">
        <textarea
          autoFocus
          name="content"
          value={form.content}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Compartilhe uma oportunidade, evento ou ideia..."
          className="flex-1 focus:outline-none bg-transparent text-xl w-full min-h-32 resize-none pr-3 p-3"
        />
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="flex gap-2">
              <Select
                name="type"
                options={typeOptions}
                width="10vw"
                className="text-text"
                value={form.type}
                placeholder="Tipo"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, type: e.target.value }))
                }
              />

              {showExpiresAt ? expiresAtInput : ""}
            </span>

            {anyChangeOnLayout ? "" : buttonLayout}
          </div>
          <div
            className={`flex flex-col w-full gap-2 ${anyChangeOnLayout ? "" : "hidden"}`}
          >
            {showLocation ? locationInput : ""}
            {showContactInfo ? contactInput : ""}
          </div>
          <div
            className={`flex justify-end gap-2 ${anyChangeOnLayout ? "" : "hidden"}`}
          >
            {buttonLayout}
          </div>
        </div>
      </div>
    );

  return (
    <Input
      placeholder="Compartilhe uma oportunidade, evento ou ideia..."
      value={""}
      onChange={() => {}}
      onClick={() => setInputMode(true)}
      width="100%"
    />
  );
}
