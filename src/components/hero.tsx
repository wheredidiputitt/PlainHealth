"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, Activity } from "lucide-react";
import TrustBadges from "@/components/trust-badges";

interface HeroProps {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export default function Hero({ onPrimaryClick, onSecondaryClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative soft blurred circles (no gradients, only solid + blur) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-[28rem] rounded-full bg-[#24A148]/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-40 size-[22rem] rounded-full bg-[#D4EFDD]/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24 lg:px-12 lg:pb-32 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[#D4EFDD] bg-[#EAF8EF] px-3.5 py-1.5 text-sm font-medium text-[#1E8B3D]"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#24A148] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#24A148]" />
              </span>
              AI Medical Jargon Translator
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-display mt-7 text-balance text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-[#111111] sm:text-5xl md:text-6xl lg:text-[72px]"
            >
              Translate Medical Jargon Into Plain Language.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="mt-7 max-w-xl text-pretty text-lg leading-[1.7] text-[#374151] md:text-xl"
            >
              Paste any prescription, lab result, or doctor&apos;s note and
              receive simple explanations powered by AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={onPrimaryClick}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#24A148] px-7 py-3.5 text-base font-semibold text-white shadow-button transition-all duration-300 hover:bg-[#1E8B3D] hover:shadow-button-hover hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
              >
                <Sparkles className="size-5" aria-hidden="true" />
                Explain Text
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onSecondaryClick}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#E7EBE8] bg-white px-7 py-3.5 text-base font-semibold text-[#111111] shadow-soft transition-all duration-300 hover:border-[#24A148] hover:bg-[#EAF8EF] hover:text-[#1E8B3D] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
              >
                <FileText className="size-5" aria-hidden="true" />
                Try Sample Report
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              className="mt-9"
            >
              <TrustBadges />
            </motion.div>
          </div>

          {/* Right: floating glass cards */}
          <div className="relative hidden h-[28rem] lg:block">
            <FloatingCard
              className="left-4 top-6 w-72"
              delay={0.4}
              yRange={[-6, 6]}
              duration={4.5}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EF]">
                  <Activity className="size-4 text-[#24A148]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Hemoglobin
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#111111]">
                    A protein in your blood that carries oxygen.
                  </p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="right-2 top-28 w-64"
              delay={0.55}
              yRange={[6, -6]}
              duration={5.2}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EF]">
                  <FileText className="size-4 text-[#24A148]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    BID
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#111111]">
                    Twice a day, usually morning and evening.
                  </p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="bottom-8 left-16 w-72"
              delay={0.7}
              yRange={[-5, 5]}
              duration={4.8}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF7E6]">
                  <Sparkles className="size-4 text-amber-600" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    MCV
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#111111]">
                    How big your red blood cells are. Small cells may suggest low iron.
                  </p>
                </div>
              </div>
            </FloatingCard>

            {/* Decorative rings */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 m-auto size-72 rounded-full border border-[#D4EFDD]/60"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 m-auto size-96 rounded-full border border-[#EAF8EF]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FloatingCardProps {
  className: string;
  children: React.ReactNode;
  delay: number;
  yRange: [number, number];
  duration: number;
}

function FloatingCard({
  className,
  children,
  delay,
  yRange,
  duration,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: yRange }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="rounded-[24px] border border-white/60 bg-white/70 p-5 shadow-floating backdrop-blur-[20px]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
