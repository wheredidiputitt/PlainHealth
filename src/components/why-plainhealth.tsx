"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  Clock,
  BookOpen,
  LayoutList,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

const STATS: Stat[] = [
  {
    icon: Clock,
    value: "< 10s",
    label: "Average explanation time",
  },
  {
    icon: BookOpen,
    value: "12-yr",
    label: "Reading level target",
  },
  {
    icon: LayoutList,
    value: "5",
    label: "Structured output sections",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Private, no data stored",
  },
];

export default function WhyPlainHealth() {
  return (
    <section
      id="why-plainhealth"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-[#24A148]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + SDG3 */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#24A148]">
              Why PlainHealth
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-[42px] md:leading-[1.1]">
              Built for health literacy, designed for everyone
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-[#374151] md:text-base">
              Nine out of ten adults struggle to understand everyday health
              information. PlainHealth turns dense medical documents into clear,
              friendly explanations, empowering patients to ask the right
              questions and make informed decisions.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 rounded-[24px] border border-[#D4EFDD] bg-[#EAF8EF] px-5 py-4 shadow-soft">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#24A148] text-white shadow-[0_4px_14px_rgba(36,161,72,0.28)]">
                <Globe2 className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1E8B3D]">
                  Supports UN SDG 3
                </p>
                <p className="mt-0.5 text-sm font-medium text-[#111111]">
                  Good Health &amp; Well-being for all
                </p>
              </div>
            </div>
          </div>

          {/* Right: stat grid */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col gap-3 rounded-[24px] border border-[#E7EBE8] bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EAF8EF]">
                    <Icon className="size-5 text-[#24A148]" aria-hidden="true" />
                  </span>
                  <p className="font-display mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111111] md:text-[40px] md:leading-[1.1]">
                    {s.value}
                  </p>
                  <p className="text-sm leading-snug text-[#6B7280]">
                    {s.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
