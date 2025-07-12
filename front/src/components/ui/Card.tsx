import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  const baseClasses = "bg-white rounded-2xl overflow-hidden shadow-lg";
  const hoverClasses = hover
    ? "hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
