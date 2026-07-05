"use client";

import { UserX, DatabaseZap, Cpu, GraduationCap } from "lucide-react";
import LegalPage, { type LegalSection } from "@/components/legal-page";

interface PrivacyViewProps {
  onBack: () => void;
}

const SECTIONS: LegalSection[] = [
  {
    icon: UserX,
    title: "No User Accounts",
    body: (
      <>
        <p>
          PlainHealth does not require you to sign up, log in, or provide any
          personal information. There is no username, no email, no password,
          and no profile tied to your activity.
        </p>
        <p>
          You can use the translator immediately on arrival with no friction, no
          forms, and no identity to manage or recover.
        </p>
      </>
    ),
  },
  {
    icon: DatabaseZap,
    title: "No Permanent Storage of Medical Text",
    body: (
      <>
        <p>
          The medical text you paste is held in browser memory only for as long
          as it takes to send it to our AI provider and render your
          explanation. PlainHealth does not write your input to a database,
          log file, or persistent store.
        </p>
        <p>
          When you clear the textarea, reload the page, or close the tab, the
          text is gone. We do not maintain chat history, and there is no way
          for us, or anyone else, to retrieve what you previously pasted.
        </p>
      </>
    ),
  },
  {
    icon: Cpu,
    title: "AI Processing Only for Generating Explanations",
    body: (
      <>
        <p>
          Your text is sent to our AI language model provider for the sole
          purpose of producing a plain-language explanation. It is not used to
          train models, build profiles, serve ads, or for any secondary
          purpose.
        </p>
        <p>
          The processing is stateless: each explanation is generated
          independently, with no memory of previous requests.
        </p>
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: "Educational Use Only",
    body: (
      <p>
        PlainHealth is an educational tool, not a medical service. The
        explanations it generates are intended to help you build a general
        understanding of medical language; they are not medical advice,
        diagnosis, or treatment. Use them to inform a conversation with a
        qualified healthcare professional, never as a substitute for one.
      </p>
    ),
    tint: "bg-amber-50 text-amber-700",
  },
];

export default function PrivacyView({ onBack }: PrivacyViewProps) {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="What happens to the text you paste."
      lead="PlainHealth is designed to be privacy-respecting by default. Here is exactly what we do, and don't do, with your information."
      sections={SECTIONS}
      onBack={onBack}
    />
  );
}
