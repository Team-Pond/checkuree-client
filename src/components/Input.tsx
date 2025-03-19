import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "file"
    | "image"
    | "hidden"
    | "reset"
    | "submit"
    | "button"
    | "checkbox"
    | "radio"
    | "range"
    | "week"
    | "";
  value?: string;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    { onChange, placeholder, className, type = "text", value, disabled },
    ref
  ) => {
    return (
      <input
        type={type}
        {...(value !== undefined ? { value } : {})}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
        className={twMerge(
          "outline-none bg-white border  border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4 text-text-secondary text-left",
          className
        )}
      />
    );
  }
);

export default Input;
