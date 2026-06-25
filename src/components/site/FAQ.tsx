import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const FAQS = [
  {
    q: "How does PDFLingo preserve the original layout?",
    a: "We extract text along with its exact coordinates, fonts and styles. After translation, our engine re-flows the new text into the original boxes — preserving tables, columns, headers and images pixel-for-pixel.",
  },
  {
    q: "Which languages are supported?",
    a: "Over 100 languages, including all major European, Asian, Middle-Eastern and African languages. Right-to-left scripts like Arabic and Hebrew are fully supported.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Files are encrypted in transit and at rest, and are automatically deleted within 24 hours. We never train models on your documents.",
  },
  {
    q: "What's the maximum file size?",
    a: "The free tier supports PDFs up to 50 MB. Higher limits are available on paid plans for enterprise documents.",
  },
  {
    q: "Can I translate scanned PDFs?",
    a: "Yes — scanned PDFs are run through OCR first to recognize text, then translated and rebuilt as a fully selectable PDF.",
  },
  {
    q: "Do I need to install any software?",
    a: "No. PDFLingo works entirely in your browser. Upload, translate, download — that's it.",
  },
];

export function FAQ({ heading = true }: { heading?: boolean }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      {heading && (
        <div className="text-center">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </div>
      )}
      <div className="mt-10 space-y-3">
        {FAQS.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-strong shadow-soft overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="text-muted-foreground animate-fade-up px-6 pb-5 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}
