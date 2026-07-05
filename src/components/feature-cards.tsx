"use client";

import { motion } from "framer-motion";
import {
  TestTube,
  Pill,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  tint: string;
}

const FEATURES: Feature[] = [
  {
    icon: TestTube,
    title: "Blood Test Reports",
    description:
      "Understand your lab results without Googling every term. CBC panels, metabolic markers, and reference ranges explained clearly.",
    tint: "bg-red-50 text-red-600",
  },
  {
    icon: Pill,
    title: "Prescriptions",
    description:
      "Know exactly what you're taking, why, and how often. Decode Latin abbreviations like BID, QD, PRN, and PO in seconds.",
    tint: "bg-[#EAF8EF] text-[#1E8B3D]",
  },
  {
    icon: Stethoscope,
    title: "Doctor's Notes",
    description:
      "Make sense of discharge summaries and visit notes. Turn dense clinical language into a clear, friendly summary you can act on.",
    tint: "bg-[#FFF7E6] text-amber-700",
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-32 lg:px-12">
      <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#24A148]">
          Built for every report
        </p>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-[42px] md:leading-[1.1]">
          One translator for your whole health journey
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-[#6B7280] md:text-base">
          Whatever your doctor hands you, PlainHealth turns it into language a
          12-year-old could understand.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="flex h-full flex-col rounded-[24px] border border-[#E7EBE8] bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-2xl ${f.tint}`}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-[#111111]">
                {f.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">
                {f.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
