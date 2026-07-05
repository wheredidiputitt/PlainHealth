"use client";

import { useState } from "react";
import { HeartPulse, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppView } from "@/types";

interface NavbarProps {
  view: AppView;
  onViewChange: (view: AppView) => void;
}

export default function Navbar({ view, onViewChange }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (view !== "home") {
      onViewChange("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToView = (v: AppView) => {
    setOpen(false);
    onViewChange(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setOpen(false);
    onViewChange("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (v: AppView) => view === v;

  const navLinkClass = (v: AppView) =>
    "link-underline rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 " +
    (isActive(v)
      ? "text-[#1E8B3D]"
      : "text-[#374151] hover:text-[#1E8B3D]");

  const mobileNavLinkClass = (v: AppView) =>
    "min-h-12 rounded-xl px-4 py-3 text-left text-base font-medium transition-colors " +
    (isActive(v)
      ? "bg-[#EAF8EF] text-[#1E8B3D]"
      : "text-[#374151] hover:bg-[#EAF8EF] hover:text-[#1E8B3D]");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E7EBE8]/60 bg-[#F7F8F6]/70 backdrop-blur-[20px]">
      <nav
        className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:h-[88px] md:px-8 lg:px-12"
        aria-label="Primary"
      >
        {/* Left: Logo */}
        <button
          type="button"
          onClick={goHome}
          className="group flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
          aria-label="PlainHealth home"
        >
          <span className="flex size-9 items-center justify-center rounded-2xl bg-[#24A148] text-white shadow-[0_4px_14px_rgba(36,161,72,0.28)] transition-transform duration-300 group-hover:scale-105">
            <HeartPulse className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-[#111111] md:text-xl">
            PlainHealth
          </span>
        </button>

        {/* Center: nav links */}
        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={() => scrollTo("how-it-works")}
            className="link-underline rounded-lg px-3.5 py-2 text-sm font-medium text-[#374151] transition-colors hover:text-[#1E8B3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
          >
            How it Works
          </button>
          <button
            type="button"
            onClick={() => scrollTo("why-plainhealth")}
            className="link-underline rounded-lg px-3.5 py-2 text-sm font-medium text-[#374151] transition-colors hover:text-[#1E8B3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2"
          >
            Why PlainHealth
          </button>
          <button
            type="button"
            onClick={() => goToView("about")}
            className={navLinkClass("about")}
          >
            About
          </button>
        </div>

        {/* Right: AI Powered pill + Try Now + mobile menu button */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-[#D4EFDD] bg-[#EAF8EF] px-3 py-1.5 text-xs font-semibold text-[#1E8B3D] lg:inline-flex">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI Powered
          </span>
          <button
            type="button"
            onClick={() => scrollTo("translator")}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-[#24A148] px-5 py-2.5 text-sm font-semibold text-white shadow-button transition-all duration-300 hover:bg-[#1E8B3D] hover:shadow-button-hover hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 sm:inline-flex"
          >
            Try Now
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-[#E7EBE8] bg-white/70 text-[#111111] transition-colors hover:bg-[#EAF8EF] md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#E7EBE8]/60 bg-[#F7F8F6]/95 backdrop-blur-[20px] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              <button
                type="button"
                onClick={() => scrollTo("how-it-works")}
                className="min-h-12 rounded-xl px-4 py-3 text-left text-base font-medium text-[#374151] hover:bg-[#EAF8EF] hover:text-[#1E8B3D]"
              >
                How it Works
              </button>
              <button
                type="button"
                onClick={() => scrollTo("why-plainhealth")}
                className="min-h-12 rounded-xl px-4 py-3 text-left text-base font-medium text-[#374151] hover:bg-[#EAF8EF] hover:text-[#1E8B3D]"
              >
                Why PlainHealth
              </button>
              <button
                type="button"
                onClick={() => goToView("about")}
                className={mobileNavLinkClass("about")}
              >
                About
              </button>
              <button
                type="button"
                onClick={() => goToView("privacy")}
                className={mobileNavLinkClass("privacy")}
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => goToView("terms")}
                className={mobileNavLinkClass("terms")}
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => scrollTo("translator")}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#24A148] px-5 py-3 text-base font-semibold text-white shadow-button transition-all hover:bg-[#1E8B3D]"
              >
                Try Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
