import Link from "next/link";
import React from "react";
import { HiOutlineTicket } from "react-icons/hi";
import { FaTiktok, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
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
            <span className="font-bold text-xl">PDFai</span>
          </Link>
          <p className="text-gray-600 text-sm">
            Chat with any PDF: ask questions, get summaries, find information,
            and more.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaTiktok className="w-5 h-5 text-gray-400" />
            <FaInstagram className="w-5 h-5 text-gray-400" />
            <FaTwitter className="w-5 h-5 text-gray-400" />
            <FaYoutube className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/use-cases">Use cases</Link>
            </li>
            <li>
              <Link href="/chrome-extension">Chrome extension</Link>
            </li>
            <li>
              <Link href="/api-docs">API docs</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/video-tutorials">Video tutorials</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">We also built</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/resume-ai-scanner">Resume AI Scanner</Link>
            </li>
            <li>
              <Link href="/invoice-ai-scanner">Invoice AI Scanner</Link>
            </li>
            <li>
              <Link href="/ai-quiz-generator">AI Quiz Generator</Link>
            </li>
            <li>
              <Link href="/quickyai">QuickyAI</Link>
            </li>
            <li>
              <Link href="/docsum">Docsum</Link>
            </li>
            <li>
              <Link href="/pdf-gpts">PDF GPTs</Link>
            </li>
            <li>
              <Link href="/other-pdf-tools">Other PDF tools</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/pdf-ai-vs-chatpdf">PDF.ai vs ChatPDF</Link>
            </li>
            <li>
              <Link href="/pdf-ai-vs-acrobat-reader">
                PDF.ai vs Acrobat Reader
              </Link>
            </li>
            <li>
              <Link href="/legal">Legal</Link>
            </li>
            <li>
              <Link href="/affiliate-program">
                Affiliate program{" "}
                <HiOutlineTicket className="inline w-4 h-4 text-yellow-400" />
              </Link>
            </li>
            <li>
              <Link href="/investor">Investor</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
