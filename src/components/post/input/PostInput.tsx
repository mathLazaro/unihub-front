import { useState } from "react";
import Input from "../../input/Input";
import Button from "../../button/Button";
import type { SelectOption } from "../../select/Select";
import Select from "../../select/Select";
import { POST_TYPE } from "../../../core/post-type.enum";

export interface PostInputProps {
  onSubmit: (message: string) => void;
}

export default function PostInput({ onSubmit }: PostInputProps) {
  const [message, setMessage] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const options: SelectOption[] = Object.entries(POST_TYPE).map(
    ([key, label]) => ({
      value: key,
      label,
    }),
  );
  if (inputMode)
    return (
      <div className="input-wrapper">
        <textarea
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Compartilhe uma oportunidade, evento ou ideia..."
          className="flex-1 focus:outline-none bg-transparent text-xl w-full min-h-32 resize-none pr-3"
        />
        <div className="flex justify-end gap-2 items-center">
          <Select options={options} width="12rem" className="text-text" />

          <Button
            styleButton="neutral"
            size="lg"
            onClick={() => {
              setInputMode(false);
              setMessage("");
            }}
          >
            Cancelar
          </Button>

          <Button
            styleButton="primary"
            size="lg"
            onClick={() => {
              onSubmit(message);
              setInputMode(false);
            }}
          >
            Publicar
          </Button>
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
