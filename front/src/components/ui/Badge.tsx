import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "purple" | "green" | "yellow" | "red";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-block rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
