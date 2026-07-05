"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Translator from "@/components/translator";
import ExampleCards from "@/components/example-cards";
import FeatureCards from "@/components/feature-cards";
import HowItWorks from "@/components/how-it-works";
import WhyPlainHealth from "@/components/why-plainhealth";
import AboutView from "@/components/about-view";
import PrivacyView from "@/components/privacy-view";
import TermsView from "@/components/terms-view";
import Footer from "@/components/footer";
import { SAMPLE_REPORTS, type SampleId } from "@/lib/samples";
import type { AppView } from "@/types";

export default function Home() {
  const [view, setView] = useState<AppView>("home");
  const [inputText, setInputText] = useState("");
  const [lastSample, setLastSample] = useState<SampleId | null>(null);

  const scrollToTranslator = useCallback(() => {
    document
      .getElementById("translator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePrimaryClick = useCallback(() => {
    scrollToTranslator();
  }, [scrollToTranslator]);

  const handleSecondaryClick = useCallback(() => {
    setInputText(SAMPLE_REPORTS.blood.content);
    setLastSample("blood");
    scrollToTranslator();
  }, [scrollToTranslator]);

  const handleSampleSelect = useCallback(
    (id: SampleId) => {
      setInputText(SAMPLE_REPORTS[id].content);
      setLastSample(id);
      scrollToTranslator();
    },
    [scrollToTranslator]
  );

  const handleViewChange = useCallback((v: AppView) => {
    setView(v);
  }, []);

  const goHome = useCallback(() => setView("home"), []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8F6] text-[#111111]">
      <Navbar view={view} onViewChange={handleViewChange} />
      <main className="flex-1">
        {view === "home" && (
          <>
            <Hero
              onPrimaryClick={handlePrimaryClick}
              onSecondaryClick={handleSecondaryClick}
            />
            <Translator
              inputText={inputText}
              onInputTextChange={setInputText}
              lastSample={lastSample}
            />
            <ExampleCards onSelect={handleSampleSelect} />
            <FeatureCards />
            <HowItWorks />
            <WhyPlainHealth />
          </>
        )}
        {view === "about" && <AboutView onBack={goHome} />}
        {view === "privacy" && <PrivacyView onBack={goHome} />}
        {view === "terms" && <TermsView onBack={goHome} />}
      </main>
      <Footer view={view} onViewChange={handleViewChange} />
    </div>
  );
}
