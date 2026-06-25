import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <div className="bg-gradient-primary shadow-glow relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white sm:px-16 sm:py-20">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <h2 className="relative text-3xl font-bold sm:text-4xl">
          Ready to translate your first PDF?
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/80">
          No signup required to try. Upload your document and see the magic in under a minute.
        </p>
        <Link
          to="/translate"
          className="text-primary relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Translate PDF now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
