export type SampleId = "blood" | "prescription" | "doctor";

export interface ExplainRequest {
  text: string;
}

export interface ExplainResponse {
  content: string;
}

export interface ExplainErrorResponse {
  error: string;
}

export type ExplainStatus = "idle" | "loading" | "success" | "error";

export interface ExplainState {
  status: ExplainStatus;
  content: string | null;
  error: string | null;
}

export type AppView = "home" | "about" | "privacy" | "terms";

export interface ParsedSection {
  id: string;
  title: string;
  body: string;
}
