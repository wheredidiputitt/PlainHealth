"use client";

import { motion } from "framer-motion";
import { Droplet, Pill, Stethoscope, ArrowRight } from "lucide-react";
import { SAMPLE_LIST, type SampleId } from "@/lib/samples";

interface ExampleCardsProps {
  onSelect: (id: SampleId) => void;
}

const ICONS: Record<SampleId, typeof Droplet> = {
  blood: Droplet,
  prescription: Pill,
  doctor: Stethoscope,
};

const ACCENT: Record<SampleId, string> = {
  blood: "bg-red-50 text-red-600",
  prescription: "bg-[#EAF8EF] text-[#1E8B3D]",
  doctor: "bg-[#FFF7E6] text-amber-700",
};

export default function ExampleCards({ onSelect }: ExampleCardsProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-32 lg:px-12">
      <div className="mb-12 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#24A148]">
            Try a real example
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-[42px] md:leading-[1.1]">
            Start with a sample report
          </h2>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-[#6B7280]">
          Pick one of these real-world medical snippets to see PlainHealth in
          action, then run it through the translator.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {SAMPLE_LIST.map((sample, i) => {
          const Icon = ICONS[sample.id];
          const accent = ACCENT[sample.id];
          return (
            <motion.button
              key={sample.id}
              type="button"
              onClick={() => onSelect(sample.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col items-start rounded-[24px] border border-[#E7EBE8] bg-white p-7 text-left shadow-card transition-shadow duration-300 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
              aria-label={`Load ${sample.label} sample into the translator`}
            >
              <span
                className={`flex size-12 items-center justify-center rounded-2xl ${accent} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-6 text-xl font-semibold tracking-tight text-[#111111]">
                {sample.label}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6B7280]">
                {sample.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#24A148] transition-colors group-hover:text-[#1E8B3D]">
                Load sample
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
