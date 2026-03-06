import React, { useState } from "react";

const OWNER_NAME = "Chirag Dodiya";
const OWNER_EMAIL = "hi@chirag.co";

// --- Utility for clipboard ---
function copyToClipboard(text: string) {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

type GeneratorMode = "product" | "url";
type GenerationResult = {
  headline: string;
  subheadline?: string;
  features?: string[];
  cta: string;
  error?: string;
};

export default function Home() {
  const [mode, setMode] = useState<GeneratorMode>("product");
  // Product Info
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  // URL
  const [url, setUrl] = useState("");
  // Generation
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // --- Main copy generation logic ---
  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setInputError(null);
    setResult(null);

    // Input validation
    if (mode === "product") {
      if (!productName.trim() || !productDesc.trim()) {
        setInputError("Please enter both product name and description.");
        return;
      }
    }
    if (mode === "url") {
      if (!url.trim()) {
        setInputError("Please enter a valid website URL.");
        return;
      }
      try {
        new URL(url.trim());
      } catch {
        setInputError("Please enter a valid website URL (include https://).");
        return;
      }
    }
    setLoading(true);

    try {
      // Simulated delay and deterministic "AI" copywriting generator
      let generated: GenerationResult;
      if (mode === "product") {
        generated = generateCopyFromProduct(productName, productDesc);
      } else {
        generated = await generateCopyFromUrl(url);
      }
      setResult(generated);
    } catch (err: any) {
      setResult({ headline: "", cta: "", error: err?.message || "Generation failed" });
    }
    setLoading(false);
  }

  // ----------- "AI" Stubs (local simulation) -------------
  // In production, replace with API call to OpenAI or similar

  function generateCopyFromProduct(productName: string, productDesc: string): GenerationResult {
    // Simulate "AI" output
    const features = extractFeaturesFromDesc(productDesc);
    return {
      headline: `Elevate Your ${productName} Today`,
      subheadline: truncateAndPhrase(productDesc, 80),
      features,
      cta: `Start Using ${productName}`,
    };
  }

  async function generateCopyFromUrl(siteUrl: string): Promise<GenerationResult> {
    // Simulate fetching and analysis.
    // TODO: Replace with real scraping + AI call in production.
    // We'll fake content for now.
    const domain = (siteUrl || "").replace(/^https?:\/\//, "").replace(/\/.*/, "");
    // Example output
    return {
      headline: `Supercharge Your Results with ${capitalizeDomain(domain)}`,
      features: [
        `Instantly analyze and optimize your site`,
        `Boost conversions with proven techniques`,
        `Easy integration, no coding needed`,
      ],
      cta: "Get Your Improved Copy",
    };
  }

  function extractFeaturesFromDesc(desc: string): string[] {
    // Rudimentary split by key sentences/phrases for demonstration
    let out = desc
      .split(/[.!\n]/)
      .map((f) => f.trim())
      .filter((f) => f.length > 12)
      .slice(0, 3);
    if (!out.length) out = ["Cutting-edge features to help you stand out."];
    return out.map((f) => capitalize(f));
  }

  function truncateAndPhrase(text: string, maxLen: number) {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen - 3).trim() + "...";
  }

  function capitalizeDomain(domain: string) {
    return domain
      .split(".")
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");
  }

  function capitalize(str: string) {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  }

  // UI Parts
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto my-0 flex w-full max-w-3xl flex-1 flex-col items-center justify-start bg-white px-4 pb-8 pt-20 dark:bg-black">
        {/* Brand/logo */}
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mt-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            CopyLift – Landing Page Copy Generator
          </h1>
          <h2 className="mt-2 text-lg font-medium text-zinc-600 dark:text-zinc-200">
            Instantly craft compelling landing page copy using AI ✨
          </h2>
        </div>

        {/* Mode Switcher */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setMode("product")}
            className={`rounded-l-full border border-r-0 border-indigo-200 px-4 py-2 font-medium transition-colors ${
              mode === "product"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-700 hover:bg-indigo-50"
            }`}
            disabled={mode === "product"}
          >
            Copy from Product Info
          </button>
          <button
            onClick={() => setMode("url")}
            className={`rounded-r-full border border-indigo-200 px-4 py-2 font-medium transition-colors ${
              mode === "url"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-700 hover:bg-indigo-50"
            }`}
            disabled={mode === "url"}
          >
            Copy from Website URL
          </button>
        </div>

        {/* Input Forms */}
        <form
          onSubmit={handleGenerate}
          className="flex w-full max-w-xl flex-col gap-4 bg-zinc-50 px-6 py-6 shadow-lg dark:bg-zinc-900/70 sm:rounded-xl"
        >
          {mode === "product" && (
            <>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Product Name
              </label>
              <input
                className="mb-2 rounded border border-indigo-200 bg-white px-4 py-2 font-medium outline-none transition focus:border-indigo-400 dark:bg-black/80 dark:text-zinc-100"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="E.g. SnapWidget"
                disabled={loading}
                required
                minLength={2}
              />
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Product Description
              </label>
              <textarea
                className="mb-2 resize-none rounded border border-indigo-200 bg-white px-4 py-2 font-medium outline-none transition focus:border-indigo-400 dark:bg-black/80 dark:text-zinc-100"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                rows={3}
                placeholder="A widget that lets you display Instagram feeds on your website, with analytics and customizable layouts."
                disabled={loading}
                required
                minLength={12}
              />
            </>
          )}
          {mode === "url" && (
            <>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Website URL
              </label>
              <input
                className="mb-2 rounded border border-indigo-200 bg-white px-4 py-2 font-medium outline-none transition focus:border-indigo-400 dark:bg-black/80 dark:text-zinc-100"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourproject.com"
                type="url"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                disabled={loading}
                required
                minLength={8}
              />
            </>
          )}
          {/* Error and Generate Button */}
          {inputError && (
            <div className="rounded bg-red-100 px-4 py-2 font-medium text-red-700 dark:bg-red-900 dark:text-red-200">
              {inputError}
            </div>
          )}
          <button
            type="submit"
            className={`mt-3 rounded bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors 
              hover:bg-indigo-700 focus:bg-indigo-800 disabled:opacity-60`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Copy"}
          </button>
        </form>

        {/* Results */}
        <section className="mt-10 w-full max-w-xl">
          {result && !result.error && (
            <div className="flex flex-col gap-6 rounded-xl border border-indigo-100 bg-white p-6 shadow dark:bg-zinc-900/80">
              {result.headline && (
                <GeneratedSection label="Headline" value={result.headline} />
              )}
              {mode === "product" && result.subheadline && (
                <GeneratedSection label="Subheadline" value={result.subheadline} />
              )}
              {result.features && result.features.length > 0 && (
                <GeneratedSection
                  label="Features"
                  value={
                    <ul className="ml-2 list-disc pl-5">
                      {result.features.map((f, i) => (
                        <li key={i} className="mb-1">
                          {f}
                        </li>
                      ))}
                    </ul>
                  }
                  textValue={result.features.join("\n")}
                />
              )}
              {result.cta && <GeneratedSection label="CTA" value={result.cta} />}
            </div>
          )}
          {result && result.error && (
            <div className="rounded bg-red-100 px-4 py-2 font-medium text-red-700 dark:bg-red-900 dark:text-red-200">
              {result.error}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-4 flex w-full flex-col items-center justify-center bg-white/80 px-4 py-8 text-center text-sm text-zinc-600 dark:bg-black/80 dark:text-zinc-300">
        <div>
          &copy; {new Date().getFullYear()} CopyLift · A project by{" "}
          <a href={`mailto:${OWNER_EMAIL}`} className="text-indigo-700 underline hover:text-indigo-500 dark:text-indigo-300">
            {OWNER_NAME}
          </a>
        </div>
        <div>
          Need help? Contact: <a href={`mailto:${OWNER_EMAIL}`} className="text-indigo-700 underline hover:text-indigo-500 dark:text-indigo-300">{OWNER_EMAIL}</a>
        </div>
      </footer>
    </div>
  );
}

// -- Helper for result sections with copy-to-clipboard button --
function GeneratedSection({
  label,
  value,
  textValue,
}: {
  label: string;
  value: React.ReactNode | string;
  textValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    let text;
    if (typeof value === "string") {
      text = value;
    } else if (typeof textValue === "string") {
      text = textValue;
    } else {
      text = "";
    }
    copyToClipboard(text || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div>
      <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-widest text-indigo-500">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <div className={`flex-1 text-lg font-medium text-zinc-900 dark:text-zinc-50`}>
          {value}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-300 transition hover:bg-indigo-200 hover:text-indigo-900 dark:bg-black/40 dark:text-indigo-200 dark:ring-indigo-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}