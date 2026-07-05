"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface LegalSection {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
  tint?: string;
}

interface LegalPageProps {
  /** Eyebrow label above the title (e.g. "Privacy"). */
  eyebrow: string;
  /** Page headline. */
  title: string;
  /** Lead paragraph below the title. */
  lead: string;
  /** Ordered list of sections. */
  sections: LegalSection[];
  /** Called when the user clicks the back button. */
  onBack: () => void;
}

const DEFAULT_TINT = "bg-[#EAF8EF] text-[#1E8B3D]";

/**
 * Shared layout for legal / informational pages (Privacy, Terms, etc.).
 * Mirrors the About view's visual language so all secondary views feel
 * consistent without duplicating markup.
 */
export default function LegalPage({
  eyebrow,
  title,
  lead,
  sections,
  onBack,
}: LegalPageProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-[#24A148]/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-32 lg:px-12">
        <motion.button
          type="button"
          onClick={onBack}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E7EBE8] bg-white px-5 py-2.5 text-sm font-semibold text-[#111111] shadow-soft transition-all duration-300 hover:border-[#24A148] hover:bg-[#EAF8EF] hover:text-[#1E8B3D] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to translator
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[#24A148]">
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#111111] md:text-[56px]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.7] text-[#374151]">
            {lead}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const tint = s.tint ?? DEFAULT_TINT;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[24px] border border-[#E7EBE8] bg-white p-7 shadow-card md:p-9"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex size-11 items-center justify-center rounded-2xl ${tint}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
                    {s.title}
                  </h2>
                </div>
                <div className="text-[15px] leading-[1.8] text-[#374151] md:text-base [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:mt-2 [&>ul]:space-y-2 [&>ul>li]:relative [&>ul>li]:pl-5 [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-0 [&>ul>li::before]:content-['•'] [&>ul>li::before]:text-[#24A148] [&>ul>li::before]:font-bold">
                  {s.body}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
