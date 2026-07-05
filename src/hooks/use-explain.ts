"use client";

import { useCallback, useState } from "react";
import { explainText, ExplainError } from "@/services/explain";
import type { ExplainState } from "@/types";

const initialState: ExplainState = {
  status: "idle",
  content: null,
  error: null,
};

export function useExplain() {
  const [state, setState] = useState<ExplainState>(initialState);

  const explain = useCallback(async (text: string) => {
    setState({ status: "loading", content: null, error: null });
    try {
      const res = await explainText(text);
      setState({ status: "success", content: res.content, error: null });
      return res.content;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // user cancelled; keep idle
        setState({ status: "idle", content: null, error: null });
        return null;
      }
      const message =
        err instanceof ExplainError
          ? err.message
          : "Something went wrong. Please try again.";
      setState({ status: "error", content: null, error: message });
      return null;
    }
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  return { ...state, explain, reset };
}
