/**
 * Central site configuration.
 *
 * Update `GITHUB_URL` below with the real repository URL once it is published.
 * Until then it stays as a placeholder so the footer link renders but points
 * to a sensible default (the GitHub home page).
 */
export const SITE_CONFIG = {
  name: "PlainHealth",
  tagline: "Making healthcare information easier to understand through AI.",
  /** Replace with the real repository URL when published. */
  githubUrl: "https://github.com/",
  /** Set to `true` once the repository is public so the footer link is enabled. */
  githubEnabled: false,
  hackathon: "PresentMe Hackathon",
  sdg: "UN SDG 3: Good Health & Well-being",
  copyrightYear: new Date().getFullYear(),
} as const;
