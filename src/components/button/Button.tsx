import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleButton?: "primary" | "secondary" | "danger" | "neutral";
  size?: "lg" | "md" | "sm";
  arbitraryColor?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function Button({
  styleButton = "primary",
  size = "md",
  arbitraryColor,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  onClick,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${styleButton}`,
    `btn-${size}`,
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = arbitraryColor ? { backgroundColor: arbitraryColor } : undefined;

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {loading ? <span className="btn-spinner">⏳</span> : children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  return (
    <button
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );
}
