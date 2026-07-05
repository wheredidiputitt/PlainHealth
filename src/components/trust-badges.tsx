"use client";

import { GraduationCap, Lock, Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Badge {
  icon: LucideIcon;
  label: string;
}

const badges: Badge[] = [
  { icon: GraduationCap, label: "Educational" },
  { icon: Lock, label: "Private" },
  { icon: Sparkles, label: "AI Powered" },
];

export default function TrustBadges({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {badges.map((b, i) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E7EBE8] bg-white px-3.5 py-1.5 text-sm font-medium text-[#111111] shadow-soft transition-all duration-300 hover:shadow-card"
          >
            <Icon className="size-4 text-[#24A148]" aria-hidden="true" />
            <span>{b.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
