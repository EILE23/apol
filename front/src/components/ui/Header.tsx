import Link from "next/link";
import { useState } from "react";

type HeaderType = "home" | "projects" | "project-detail";

interface HeaderProps {
  type: HeaderType;
}

export default function Header({ type }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // About 링크는 항상 /about으로 이동
  const getAboutLink = () => "/about";

  const getProjectsLink = () => {
    switch (type) {
      case "home":
        return "/projects";
      case "projects":
      case "project-detail":
        return "/projects";
      default:
        return "/projects";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href={getAboutLink()}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href={getProjectsLink()}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href={getAboutLink()}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                About
              </Link>
              <Link
                href={getProjectsLink()}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
