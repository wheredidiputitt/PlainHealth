import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlainHealth · Translate Medical Jargon Into Plain Language",
  description:
    "Paste any prescription, lab result, or doctor's note and receive simple explanations powered by AI.",
  keywords: [
    "medical translator",
    "health literacy",
    "AI medical",
    "plain language medical",
    "PlainHealth",
  ],
  authors: [{ name: "PlainHealth" }],
  openGraph: {
    title: "PlainHealth · Translate Medical Jargon Into Plain Language",
    description:
      "Paste any prescription, lab result, or doctor's note and receive simple explanations powered by AI.",
    siteName: "PlainHealth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlainHealth · Translate Medical Jargon Into Plain Language",
    description:
      "Paste any prescription, lab result, or doctor's note and receive simple explanations powered by AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#F7F8F6] text-[#111111]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
