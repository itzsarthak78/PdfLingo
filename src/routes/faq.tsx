import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — PDFLingo" },
      {
        name: "description",
        content:
          "Answers to common questions about translating PDFs with PDFLingo — supported languages, file size, security and more.",
      },
      { property: "og:title", content: "FAQ — PDFLingo" },
      {
        property: "og:description",
        content: "Common questions about PDFLingo: languages, security, file size, OCR and more.",
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-gradient-hero">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-4 text-center">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Help center
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently asked <span className="text-gradient">questions</span>
          </h1>
          <p className="text-muted-foreground mt-4">
            Everything you need to know about translating PDFs with PDFLingo.
          </p>
        </div>
        <FAQ heading={false} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
