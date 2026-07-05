"use client";

import { motion } from "framer-motion";
import {
  Target,
  AlertOctagon,
  Sparkles,
  Globe2,
  Lock,
  Bot,
  ShieldAlert,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";

interface AboutViewProps {
  onBack: () => void;
}

interface AboutSection {
  icon: LucideIcon;
  title: string;
  body: string;
  tint: string;
}

const SECTIONS: AboutSection[] = [
  {
    icon: Target,
    title: "Mission",
    body: "PlainHealth exists to bridge the gap between medical professionals and patients. We believe everyone deserves to understand their own health. By turning dense clinical language into plain explanations, we help patients ask better questions, follow their care plans more confidently, and take a more active role in their own well-being.",
    tint: "bg-[#EAF8EF] text-[#1E8B3D]",
  },
  {
    icon: AlertOctagon,
    title: "The Health Literacy Problem",
    body: "Medical reports are written for clinicians, not patients. Words like \"BID,\" \"microcytic anemia,\" or \"RLL infiltrate\" appear without explanation, and reference ranges on lab results mean little without context. Studies consistently show that even literate adults struggle to understand common medical documents. The result is anxiety, missed instructions, and avoidable follow-up visits. PlainHealth addresses this overlooked gap with a focused, fast, and free translation tool.",
    tint: "bg-[#FFF7E6] text-amber-700",
  },
  {
    icon: Sparkles,
    title: "How PlainHealth Works",
    body: "Paste any prescription, lab result, or doctor's note into the translator and tap Explain Text. An AI language model trained for plain-language explanation breaks your text into five sections: a Summary, Medical Terms Explained, Abnormal Findings, Questions To Ask Your Doctor, and a Disclaimer. The whole process takes under ten seconds. Nothing is stored, and no account is required.",
    tint: "bg-[#EAF8EF] text-[#1E8B3D]",
  },
  {
    icon: Globe2,
    title: "SDG 3 Alignment",
    body: "This project supports United Nations Sustainable Development Goal 3: Ensure healthy lives and promote well-being for all at all ages. Health literacy is a recognized determinant of health outcomes. By making medical information more accessible, PlainHealth contributes to SDG target 3.d, strengthening the capacity of all countries for early warning, risk reduction, and management of national and global health risks, by empowering individuals to understand and act on their own health information.",
    tint: "bg-[#EAF8EF] text-[#1E8B3D]",
  },
  {
    icon: Lock,
    title: "Privacy Statement",
    body: "Your text is sent securely to our AI provider for translation and is never permanently stored. We do not keep chat history, do not require accounts, and do not track what you paste. The only data we process is the medical text you submit, and it exists in memory only long enough to generate your explanation. Read the full Privacy page for details.",
    tint: "bg-[#EAF8EF] text-[#1E8B3D]",
  },
  {
    icon: Bot,
    title: "AI Limitations",
    body: "PlainHealth is powered by a language model, and language models have limits. Explanations are simplifications and may omit nuance that matters for your specific situation. The model may occasionally misread shorthand, misinterpret reference ranges, or fail to recognize a rare condition. Outputs are not reviewed by a clinician. Use PlainHealth as a starting point for understanding, never as the final word on what your report means.",
    tint: "bg-[#FFF7E6] text-amber-700",
  },
  {
    icon: ShieldAlert,
    title: "Educational Disclaimer",
    body: "PlainHealth provides general educational information only. The explanations generated are simplifications of complex medical content and may not capture every nuance of your specific situation. Never delay or disregard professional medical advice because of something you read here. If you are experiencing a medical emergency, contact your local emergency services immediately.",
    tint: "bg-red-50 text-red-700",
  },
];

export default function AboutView({ onBack }: AboutViewProps) {
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
            About PlainHealth
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#111111] md:text-[56px]">
            Healthcare, in plain language.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.7] text-[#374151]">
            PlainHealth is an AI-powered translator that turns confusing
            medical reports into clear, friendly explanations, built for the
            PresentMe Hackathon in support of UN SDG 3.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
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
                    className={`flex size-11 items-center justify-center rounded-2xl ${s.tint}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
                    {s.title}
                  </h2>
                </div>
                <p className="text-[15px] leading-[1.8] text-[#374151] md:text-base">
                  {s.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
