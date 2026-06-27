import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
  value: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  width?: string;
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  rounded?: "sm" | "md" | "lg" | "full";
  variant?: "default" | "ghost" | "outlined";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  containerClassName?: string;
  inputClassName?: string;
  maxLenght?: number;
}

const fontSizeMap = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const variantMap = {
  default: "input-wrapper",
  ghost: "input-wrapper-ghost",
  outlined: "input-wrapper-outlined",
};

export default function Input({
  placeholder,
  type = "text",
  value,
  width = "100%",
  icon,
  iconPosition = "left",
  fontSize = "xl",
  rounded = "full",
  variant = "default",
  onChange,
  onClick,
  containerClassName = "",
  inputClassName = "",
  maxLenght,
  ...rest
}: InputProps) {
  const today = new Date().toISOString().split("T")[0];

  const containerClass = [
    variantMap[variant],
    roundedMap[rounded],
    "flex items-center gap-2 px-4",
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClass = [
    "flex-1 focus:outline-none bg-transparent pl-1",
    fontSizeMap[fontSize],
    roundedMap[rounded],
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inputTemplate = (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      className={inputClass}
      defaultValue={type === "date" ? today : ""}
      min={type === "date" ? today : ""}
      maxLength={maxLenght ? maxLenght : undefined}
      {...rest}
    />
  );

  if (icon) {
    return (
      <div className={containerClass} style={{ width }}>
        {iconPosition === "left" && icon}
        {inputTemplate}
        {iconPosition === "right" && icon}
      </div>
    );
  }

  return (
    <div className={containerClass} style={{ width }}>
      {inputTemplate}
    </div>
  );
}
