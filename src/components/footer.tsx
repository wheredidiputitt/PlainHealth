"use client";

import { HeartPulse } from "lucide-react";
import type { AppView } from "@/types";
import { SITE_CONFIG } from "@/lib/site-config";
import GitHubLink from "@/components/github-link";

interface FooterProps {
  view: AppView;
  onViewChange: (view: AppView) => void;
}

export default function Footer({ view, onViewChange }: FooterProps) {
  const goToView = (v: AppView) => {
    onViewChange(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    if (view !== "home") {
      onViewChange("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-auto border-t border-[#E7EBE8] bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Left: brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-[#24A148] text-white shadow-[0_4px_14px_rgba(36,161,72,0.22)]">
                <HeartPulse className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-[#111111]">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] text-[#6B7280]">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Center: links */}
          <nav
            aria-label="Footer"
            className="md:col-span-1 md:justify-self-center"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Resources
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-1">
              <li>
                <GitHubLink variant="icon-text" />
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToView("about")}
                  className="link-underline text-[#374151] transition-colors hover:text-[#24A148] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 rounded-lg"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToView("privacy")}
                  className="link-underline text-[#374151] transition-colors hover:text-[#24A148] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 rounded-lg"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToView("terms")}
                  className="link-underline text-[#374151] transition-colors hover:text-[#24A148] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 rounded-lg"
                >
                  Terms
                </button>
              </li>
            </ul>
          </nav>

          {/* Right: hackathon + SDG */}
          <div className="md:col-span-1 md:justify-self-end">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Project
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#6B7280]">
              <li>Built for the {SITE_CONFIG.hackathon}</li>
              <li>Supporting {SITE_CONFIG.sdg}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[#E7EBE8] pt-7 text-xs text-[#6B7280] md:flex-row md:items-center">
          <p>
            © {SITE_CONFIG.copyrightYear} {SITE_CONFIG.name}. Educational tool,
            not a substitute for professional medical advice.
          </p>
          <p>Always consult a qualified healthcare professional.</p>
        </div>
      </div>
    </footer>
  );
}
