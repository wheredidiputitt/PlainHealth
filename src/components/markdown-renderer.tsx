"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h3 className="mt-0 mb-3 text-lg font-semibold tracking-tight text-[#111111] first:mt-0">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h4 className="mt-4 mb-2 text-base font-semibold text-[#111111]">
      {children}
    </h4>
  ),
  h3: ({ children }) => (
    <h5 className="mt-3 mb-2 text-sm font-semibold text-[#111111]">
      {children}
    </h5>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[15px] leading-[1.8] text-[#374151] last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2.5 pl-1 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-inside list-decimal space-y-2.5 text-[15px] text-[#374151] last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="relative pl-5 text-[15px] leading-[1.8] text-[#374151] [&>strong]:text-[#111111]">
      <span
        className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-[#24A148]"
        aria-hidden="true"
      />
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#111111]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#6B7280]">{children}</em>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-[#EAF8EF] px-1.5 py-0.5 font-mono text-[13px] text-[#1E8B3D]">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-[#24A148] bg-[#EAF8EF]/40 px-4 py-2 text-[15px] italic text-[#374151]">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline font-medium text-[#24A148] hover:text-[#1E8B3D]"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-4 border-[#E7EBE8]" />,
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto rounded-xl border border-[#E7EBE8]">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-[#E7EBE8] bg-[#F7F8F6] px-3 py-2 font-semibold text-[#111111]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#E7EBE8] px-3 py-2 text-[#374151]">
      {children}
    </td>
  ),
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div
      className={`prose-plainhealth max-w-none text-[15px] leading-relaxed ${className}`}
    >
      <ReactMarkdown components={components} skipHtml>
        {content}
      </ReactMarkdown>
    </div>
  );
}
