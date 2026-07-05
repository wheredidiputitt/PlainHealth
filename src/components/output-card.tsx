"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  FileText,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import MarkdownRenderer from "@/components/markdown-renderer";
import type { ParsedSection } from "@/types";

interface OutputCardProps {
  content: string;
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  summary: FileText,
  "medical terms explained": BookOpen,
  "abnormal findings": AlertTriangle,
  "questions to ask your doctor": HelpCircle,
  disclaimer: ShieldAlert,
};

const SECTION_TINT: Record<string, string> = {
  summary: "bg-[#EAF8EF] text-[#1E8B3D]",
  "medical terms explained": "bg-[#EAF8EF] text-[#1E8B3D]",
  "abnormal findings": "bg-red-50 text-red-700",
  "questions to ask your doctor": "bg-[#EAF8EF] text-[#1E8B3D]",
  disclaimer: "bg-[#FFF7E6] text-amber-700",
};

function parseSections(markdown: string): ParsedSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let currentTitle: string | null = null;
  let buffer: string[] = [];

  const push = () => {
    if (currentTitle !== null) {
      const body = buffer.join("\n").trim();
      sections.push({
        id: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        title: currentTitle,
        body,
      });
    }
  };

  for (const line of lines) {
    const match = /^#\s+(.+?)\s*$/.exec(line);
    if (match) {
      push();
      currentTitle = match[1].trim();
      buffer = [];
    } else if (currentTitle !== null) {
      buffer.push(line);
    } else {
      buffer.push(line);
    }
  }
  push();

  return sections.filter((s) => s.body.length > 0 || s.title.length > 0);
}

export default function OutputCard({ content }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const sections = parseSections(content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = content;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#E7EBE8] bg-white px-5 py-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#EAF8EF]">
            <Check className="size-4 text-[#24A148]" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#111111]">
              Your explanation is ready
            </p>
            <p className="text-xs text-[#6B7280]">
              {sections.length} sections · plain-language summary
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy explanation to clipboard"}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E7EBE8] bg-white px-5 text-sm font-medium text-[#111111] transition-all duration-300 hover:border-[#24A148] hover:bg-[#EAF8EF] hover:text-[#1E8B3D] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
        >
          {copied ? (
            <>
              <Check className="size-4 text-[#24A148]" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      {sections.length > 0 ? (
        <div className="grid gap-4">
          {sections.map((section, idx) => {
            const Icon =
              SECTION_ICONS[section.title.toLowerCase()] ?? FileText;
            const tint =
              SECTION_TINT[section.title.toLowerCase()] ??
              "bg-[#EAF8EF] text-[#1E8B3D]";
            return (
              <motion.section
                key={section.id + idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[24px] border border-[#E7EBE8] bg-white p-7 shadow-card md:p-8"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex size-10 items-center justify-center rounded-2xl ${tint}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[#111111] md:text-2xl">
                    {section.title}
                  </h3>
                </div>
                <MarkdownRenderer content={section.body} />
              </motion.section>
            );
          })}
        </div>
      ) : (
        <section className="rounded-[24px] border border-[#E7EBE8] bg-white p-7 shadow-card md:p-8">
          <MarkdownRenderer content={content} />
        </section>
      )}
    </motion.div>
  );
}
