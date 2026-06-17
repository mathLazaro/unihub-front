import type { SelectHTMLAttributes } from "react";
import "./select.css";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  width?: string;
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

export default function Select({
  options,
  placeholder,
  width = "100%",
  icon,
  error,
  label,
  ...rest
}: SelectProps) {
  return (
    <div className="select-wrapper">
      {label && <span className="select-label">{label}</span>}

      <div className={`select-container ${error ? "select-error" : ""}`}>
        {icon && <span>{icon}</span>}

        <select className="select-field" style={{ width }} {...rest}>
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <span className="select-error-message">{error}</span>}
    </div>
  );
}
