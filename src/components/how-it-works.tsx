"use client";

import { motion } from "framer-motion";
import { ClipboardPaste, Sparkles, CheckCircle2 } from "lucide-react";

interface Step {
  number: string;
  icon: typeof ClipboardPaste;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: ClipboardPaste,
    title: "Paste",
    description:
      "Copy any medical text (a lab result, prescription, or doctor's note) and drop it into the translator.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Explains",
    description:
      "Our AI breaks down the jargon into plain, 12-year-old-friendly language across five clear sections.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Understand",
    description:
      "Walk away with a clear summary and specific questions to ask your doctor at your next visit.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-y border-[#E7EBE8] bg-white py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#24A148]">
            How it works
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-[42px] md:leading-[1.1]">
            From confusing to clear in three steps
          </h2>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Connecting line on md+ */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-14 hidden h-px bg-[#E7EBE8] md:block"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="relative flex flex-col items-start rounded-[24px] border border-[#E7EBE8] bg-[#F7F8F6] p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="mb-6 flex w-full items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-[#24A148] text-white shadow-[0_4px_14px_rgba(36,161,72,0.28)]">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-5xl font-bold tracking-tight text-[#D4EFDD]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
