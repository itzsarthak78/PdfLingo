import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { UploadBox } from "@/components/site/UploadBox";
import { LanguageSelector } from "@/components/site/LanguageSelector";
import { LANGUAGES } from "@/lib/languages";
import { translatePdf, type Progress } from "@/lib/pdf-translator";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  Sparkles,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/translate")({
  head: () => ({
    meta: [
      { title: "Translate PDF Online — PDFLingo" },
      {
        name: "description",
        content:
          "Translate PDF files into 100+ languages in your browser. Layout, tables and images preserved. Free, secure, no signup — powered by PDFLingo AI.",
      },
      { property: "og:title", content: "Translate PDF Online — PDFLingo" },
      {
        property: "og:description",
        content:
          "Upload a PDF, pick a language, download the translation. Free in-browser PDF translator that keeps your layout.",
      },
      { property: "og:url", content: "/translate" },
    ],
    links: [{ rel: "canonical", href: "/translate" }],
  }),
  component: TranslatePage,
});

function TranslatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState(LANGUAGES.find((l) => l.code === "es")!);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string>("translated.pdf");
  const [error, setError] = useState<string | null>(null);

  async function handleTranslate() {
    if (!file) return;
    setError(null);
    setResultUrl(null);
    try {
      const blob = await translatePdf(file, language.code, setProgress);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultName(file.name.replace(/\.pdf$/i, `-${language.code}.pdf`));
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try a smaller file or another language.",
      );
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setFile(null);
    setError(null);
  }

  const busy = progress !== null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-gradient-hero">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-center">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
              <Sparkles className="text-primary h-3.5 w-3.5" />
              Free PDF translator · 100+ languages
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Upload, translate, <span className="text-gradient">download</span>
            </h1>
            <p className="text-muted-foreground mt-4">
              Your document layout, fonts, tables and images stay close to the original.
            </p>
          </div>

          {resultUrl ? (
            <DonePanel url={resultUrl} name={resultName} onReset={reset} />
          ) : (
            <div className="mt-10 space-y-5">
              <UploadBox file={file} onFile={setFile} />
              <LanguageSelector value={language} onChange={setLanguage} />

              {busy ? (
                <ProgressPanel progress={progress!} />
              ) : (
                <button
                  disabled={!file}
                  onClick={handleTranslate}
                  className="bg-gradient-primary shadow-glow inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Wand2 className="h-5 w-5" />
                  Translate to {language.name}
                </button>
              )}

              {error && (
                <div className="glass-strong flex items-start gap-3 rounded-2xl border border-red-200 p-4 text-sm">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
                  <p>{error}</p>
                </div>
              )}

              <p className="text-muted-foreground text-center text-xs">
                Files are processed entirely in your browser — they never leave your device.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProgressPanel({ progress }: { progress: Progress }) {
  const stages = [
    { key: "extracting", label: "Extracting text & layout" },
    { key: "translating", label: "Translating content" },
    { key: "rebuilding", label: "Rebuilding PDF" },
  ] as const;
  const currentIndex = stages.findIndex((s) => s.key === progress.stage);

  return (
    <div className="glass-strong shadow-card rounded-2xl p-6">
      <ul className="space-y-3">
        {stages.map((s, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={s.key} className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center">
                {done ? (
                  <CheckCircle2 className="text-primary h-5 w-5" />
                ) : active ? (
                  <Loader2 className="text-primary h-5 w-5 animate-spin" />
                ) : (
                  <span className="border-border h-3 w-3 rounded-full border-2" />
                )}
              </span>
              <span
                className={`text-sm ${
                  done || active ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {s.label}
                {active && progress.total
                  ? ` — page ${progress.current}/${progress.total}`
                  : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DonePanel({
  url,
  name,
  onReset,
}: {
  url: string;
  name: string;
  onReset: () => void;
}) {
  return (
    <div className="glass-strong shadow-glow animate-fade-up mt-10 rounded-3xl p-8 text-center">
      <span className="bg-gradient-primary shadow-glow mx-auto grid h-16 w-16 place-items-center rounded-2xl">
        <CheckCircle2 className="h-8 w-8 text-white" />
      </span>
      <h2 className="mt-5 text-2xl font-bold">Translation complete</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Your translated PDF is ready to download.
      </p>
      <div className="border-border/60 mt-6 truncate rounded-xl border p-4 text-sm font-medium">
        {name}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={url}
          download={name}
          className="bg-gradient-primary shadow-glow inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
        <button
          onClick={onReset}
          className="glass hover:shadow-soft rounded-xl px-6 py-3 text-sm font-semibold"
        >
          Translate another
        </button>
      </div>
    </div>
  );
}
