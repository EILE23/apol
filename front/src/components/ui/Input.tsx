import React from "react";

interface InputProps {
  id: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      />
    </div>
  );
}
