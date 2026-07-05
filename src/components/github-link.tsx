"use client";

import { Github } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

interface GitHubLinkProps {
  /** Visual style variant. */
  variant?: "icon-text" | "text";
  /** Extra classes for the anchor. */
  className?: string;
}

/**
 * GitHub link used in the footer and anywhere else a repo link is needed.
 *
 * While `SITE_CONFIG.githubEnabled` is `false` the link points to the GitHub
 * home page so it remains functional. Flip the flag (and update `githubUrl`)
 * in `src/lib/site-config.ts` once the repository is published.
 */
export default function GitHubLink({
  variant = "text",
  className = "",
}: GitHubLinkProps) {
  const isExternal = SITE_CONFIG.githubEnabled;
  const href = isExternal ? SITE_CONFIG.githubUrl : "https://github.com/";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={
        isExternal
          ? `View ${SITE_CONFIG.name} on GitHub (opens in a new tab)`
          : "GitHub repository (link will be updated soon)"
      }
      className={
        "link-underline inline-flex items-center gap-2 text-sm font-medium text-[#374151] transition-colors hover:text-[#24A148] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24A148] focus-visible:ring-offset-2 rounded-lg " +
        className
      }
    >
      {variant === "icon-text" && (
        <Github className="size-4" aria-hidden="true" />
      )}
      <span>GitHub</span>
    </a>
  );
}
