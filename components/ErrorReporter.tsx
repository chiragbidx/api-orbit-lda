"use client";

import { useEffect } from "react";
import { initErrorReporter } from "../scripts/error-reporter";

export function ErrorReporter() {
  useEffect(() => {
    initErrorReporter();
  }, []);

  return null;
}

export default ErrorReporter;
