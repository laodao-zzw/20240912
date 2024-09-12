import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <Link href="/" className="flex items-center space-x-2">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-bold text-xl">PDF.ai</span>
      </Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
          Pricing
        </Link>
        <Link
          href="/chrome-extension"
          className="text-gray-600 hover:text-gray-900"
        >
          Chrome extension
        </Link>
        <Link href="/use-cases" className="text-gray-600 hover:text-gray-900">
          Use cases
        </Link>
        <Link
          href="/get-started"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Get started →
        </Link>
      </nav>
    </header>
  );
}
