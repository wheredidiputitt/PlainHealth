"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Trash2,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import { useExplain } from "@/hooks/use-explain";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_LIST, getRandomSample, type SampleId } from "@/lib/samples";
import LoadingSkeleton from "@/components/loading-skeleton";
import OutputCard from "@/components/output-card";

interface TranslatorProps {
  inputText: string;
  onInputTextChange: (text: string) => void;
  lastSample: SampleId | null;
}

export default function Translator({
  inputText,
  onInputTextChange,
  lastSample,
}: TranslatorProps) {
  const { status, content, error, explain, reset } = useExplain();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lastSampleId, setLastSampleId] = useState<SampleId | null>(lastSample);

  useEffect(() => {
    setLastSampleId(lastSample);
  }, [lastSample]);

  const handleSubmit = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      toast({
        title: "Nothing to explain yet",
        description: "Paste some medical text first.",
        variant: "destructive",
      });
      return;
    }
    await explain(trimmed);
    // Scroll to output after submit
    setTimeout(() => {
      const el = document.getElementById("translator-output");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleClear = () => {
    onInputTextChange("");
    reset();
    textareaRef.current?.focus();
  };

  const handleSample = () => {
    const sample = getRandomSample(lastSampleId ?? undefined);
    onInputTextChange(sample.content);
    setLastSampleId(sample.id);
    toast({
      title: `Loaded ${sample.label} sample`,
      description: "Tap Explain Text to translate it.",
    });
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const charCount = inputText.length;
  const maxChars = 12000;

  return (
    <section
      id="translator"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-[#24A148]/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#D4EFDD]/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#24A148]">
            The translator
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-[42px] md:leading-[1.1]">
            Paste your medical text
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6B7280] md:text-base">
            Anything from a lab result to a prescription. PlainHealth explains
            it in plain language.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#E7EBE8] bg-white p-6 shadow-card md:p-8">
          <label htmlFor="medical-text" className="sr-only">
            Medical report input
          </label>
          <textarea
            id="medical-text"
            ref={textareaRef}
            value={inputText}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                onInputTextChange(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            aria-label="Medical report input"
            placeholder="Paste your medical report here..."
            className="scroll-soft min-h-[220px] w-full resize-y rounded-[20px] border border-[#E7EBE8] bg-[#F7F8F6] p-6 text-[15px] leading-relaxed text-[#111111] outline-none transition-all duration-300 placeholder:text-[#9AA6A0] focus:border-[#24A148] focus:bg-white focus:ring-4 focus:ring-[#24A148]/15 md:min-h-[220px] md:text-base"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-[#6B7280]">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded-md border border-[#E7EBE8] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#374151]">
                ⌘
              </kbd>
              <kbd className="rounded-md border border-[#E7EBE8] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#374151]">
                Enter
              </kbd>
              <span className="hidden sm:inline">to explain</span>
            </span>
            <span
              className={
                charCount > maxChars - 500
                  ? "font-medium text-amber-700"
                  : "text-[#6B7280]"
              }
            >
              {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#24A148] px-7 py-3.5 text-base font-semibold text-white shadow-button transition-all duration-300 hover:bg-[#1E8B3D] hover:shadow-button-hover hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <Sparkles className="size-5" aria-hidden="true" />
              {status === "loading" ? "Explaining..." : "Explain Text"}
            </button>
            <button
              type="button"
              onClick={handleSample}
              disabled={status === "loading"}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#E7EBE8] bg-white px-6 py-3.5 text-base font-semibold text-[#111111] shadow-soft transition-all duration-300 hover:border-[#24A148] hover:bg-[#EAF8EF] hover:text-[#1E8B3D] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              <FileText className="size-5" aria-hidden="true" />
              Sample
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={status === "loading" || (!inputText && status === "idle")}
              aria-label="Clear input and output"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-medium text-[#6B7280] transition-all duration-300 hover:bg-[#F1F4F2] hover:text-[#111111] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="size-5" aria-hidden="true" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>

          {/* Quick sample chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#E7EBE8] pt-5">
            <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
              Or load:
            </span>
            {SAMPLE_LIST.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onInputTextChange(s.content);
                  setLastSampleId(s.id);
                  toast({
                    title: `Loaded ${s.label} sample`,
                    description: "Tap Explain Text to translate it.",
                  });
                }}
                className="rounded-full border border-[#E7EBE8] bg-white px-3.5 py-1.5 text-xs font-medium text-[#374151] transition-all duration-300 hover:border-[#24A148] hover:bg-[#EAF8EF] hover:text-[#1E8B3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-1"
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Output / loading / error */}
        <div id="translator-output" className="mt-10 scroll-mt-24">
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {status === "error" && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                role="alert"
                aria-live="assertive"
              >
                <div className="flex items-start gap-3 rounded-[28px] border border-red-200 bg-red-50 p-6 shadow-card">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    <AlertCircle className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900">
                      Something went wrong
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-red-800">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Dismiss error"
                    className="inline-flex size-8 items-center justify-center rounded-lg text-red-700 transition-colors hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-1"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {status === "success" && content && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <OutputCard content={content} />
              </motion.div>
            )}

            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-[28px] border border-dashed border-[#E7EBE8] bg-white/60 p-10 text-center"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EAF8EF]">
                  <Sparkles
                    className="size-7 text-[#24A148]"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 text-base font-semibold text-[#111111]">
                  Your explanation will appear here
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#6B7280]">
                  Paste a report above and tap Explain Text. PlainHealth will
                  break it down into five clear sections.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
