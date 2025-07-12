import React from "react";

interface TextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  className = "",
  required = false,
  disabled = false,
}: TextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      />
    </div>
  );
}
