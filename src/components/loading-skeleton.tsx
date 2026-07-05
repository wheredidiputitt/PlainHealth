"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="space-y-4 rounded-[28px] border border-[#E7EBE8] bg-white p-7 shadow-card md:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="relative size-10 shrink-0 rounded-full bg-[#EAF8EF]">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#24A148]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-40 rounded-full bg-[#E7EBE8] shimmer" />
          <div className="h-2.5 w-24 rounded-full bg-[#E7EBE8] shimmer" />
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="h-4 w-1/3 rounded-md bg-[#E7EBE8] shimmer" />
        <div className="h-3 w-full rounded-md bg-[#E7EBE8] shimmer" />
        <div className="h-3 w-11/12 rounded-md bg-[#E7EBE8] shimmer" />
        <div className="h-3 w-4/5 rounded-md bg-[#E7EBE8] shimmer" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="space-y-2.5 rounded-2xl border border-[#E7EBE8] bg-[#F7F8F6] p-5"
          >
            <div className="h-4 w-1/2 rounded-md bg-[#E7EBE8] shimmer" />
            <div className="h-3 w-full rounded-md bg-[#E7EBE8] shimmer" />
            <div className="h-3 w-5/6 rounded-md bg-[#E7EBE8] shimmer" />
            <div className="h-3 w-3/4 rounded-md bg-[#E7EBE8] shimmer" />
          </div>
        ))}
      </div>

      <div className="space-y-2.5 rounded-2xl border border-[#E7EBE8] bg-[#F7F8F6] p-5">
        <div className="h-4 w-1/2 rounded-md bg-[#E7EBE8] shimmer" />
        <div className="h-3 w-full rounded-md bg-[#E7EBE8] shimmer" />
        <div className="h-3 w-5/6 rounded-md bg-[#E7EBE8] shimmer" />
        <div className="h-3 w-2/3 rounded-md bg-[#E7EBE8] shimmer" />
      </div>

      <p className="pt-2 text-center text-sm font-medium text-[#6B7280]">
        Understanding medical language...
      </p>
    </div>
  );
}
