import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
  value: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  width?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export default function Input({
  placeholder,
  type = "text",
  value,
  width = "100%",
  icon,
  iconPosition = "left",
  onChange,
  onClick,
}: InputProps) {
  const inputTemplate = (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      className="flex-1 focus:outline-none bg-transparent text-xl rounded-full "
      style={{ width }}
    />
  );

  if (icon) {
    switch (iconPosition) {
      case "left":
        return (
          <div className="input-wrapper flex items-center gap-2 px-4 rounded-full">
            {icon}
            {inputTemplate}
          </div>
        );
      case "right":
        return (
          <div className="input-wrapper flex items-center gap-2 px-4 rounded-full">
            {inputTemplate}
            {icon}
          </div>
        );
    }
  }
  return (
    <div className="input-wrapper flex items-center gap-2 px-4">
      {inputTemplate}
    </div>
  );
}
