import type { ExplainRequest, ExplainResponse, ExplainErrorResponse } from "@/types";

export async function explainText(
  text: string,
  signal?: AbortSignal
): Promise<ExplainResponse> {
  const body: ExplainRequest = { text };

  const res = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  const data = (await res.json().catch(() => null)) as
    | ExplainResponse
    | ExplainErrorResponse
    | null;

  if (!res.ok) {
    const message =
      (data && "error" in data && data.error) ||
      (res.status === 429
        ? "Too many requests. Try again shortly."
        : "Something went wrong. Please try again.");
    throw new ExplainError(message, res.status);
  }

  if (!data || !("content" in data)) {
    throw new ExplainError("Something went wrong. Please try again.", 500);
  }

  return data;
}

export class ExplainError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ExplainError";
    this.status = status;
  }
}
