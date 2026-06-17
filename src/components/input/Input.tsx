import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
  value: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  width?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  placeholder,
  type = "text",
  value,
  width = "100%",
  icon,
  iconPosition = "left",
  onChange,
}: InputProps) {
  const wraperClass = `p-2 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-primary bg-[#F5F6FA] flex items-center gap-2 px-4`;

  const inputTemplate = (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="flex-1 focus:outline-none bg-transparent text-xl "
      style={{ width }}
    />
  );

  if (icon) {
    switch (iconPosition) {
      case "left":
        return (
          <div className={wraperClass}>
            {icon}
            {inputTemplate}
          </div>
        );
      case "right":
        return (
          <div className={wraperClass}>
            {inputTemplate}
            {icon}
          </div>
        );
    }
  }
  return <div className={wraperClass}>{inputTemplate}</div>;
}
