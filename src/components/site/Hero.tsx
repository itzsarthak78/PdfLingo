import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-pdfs.png";
import { DownloadSource } from "./DownloadSource";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-hero absolute inset-0 -z-10" />
      <div className="bg-primary/20 absolute top-20 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:grid-cols-2 lg:gap-12 lg:pt-24">
        <div className="animate-fade-up order-2 lg:order-1">
          <span className="glass text-foreground/80 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium sm:text-xs">
            <Sparkles className="text-primary h-3.5 w-3.5" />
            AI Translation · 100+ languages
          </span>

          <h1 className="mt-4 text-[2rem] leading-[1.1] font-bold tracking-tight sm:mt-5 sm:text-5xl lg:text-6xl">
            Translate PDFs <br className="hidden sm:block" />
            <span className="text-gradient">without losing layout</span>
          </h1>

          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed sm:mt-5 sm:text-lg">
            AI-powered PDF translation that preserves formatting, tables, images and design
            across 100+ languages. Upload, choose a language, and download in seconds.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <Link
              to="/translate"
              className="bg-gradient-primary shadow-glow group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 sm:px-6 sm:py-3.5"
            >
              Translate PDF
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="glass hover:shadow-soft inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all sm:px-6 sm:py-3.5"
            >
              <Play className="text-primary h-4 w-4" />
              View Demo
            </a>
            <DownloadSource />
          </div>

          <div className="text-muted-foreground mt-7 grid grid-cols-3 gap-3 text-xs sm:mt-8 sm:flex sm:items-center sm:gap-6">
            <div className="min-w-0">
              <p className="text-foreground text-base font-bold sm:text-lg">100+</p>
              <p className="truncate">Languages</p>
            </div>
            <div className="bg-border hidden h-8 w-px sm:block" />
            <div className="min-w-0">
              <p className="text-foreground text-base font-bold sm:text-lg">2M+</p>
              <p className="truncate">PDFs translated</p>
            </div>
            <div className="bg-border hidden h-8 w-px sm:block" />
            <div className="min-w-0">
              <p className="text-foreground text-base font-bold sm:text-lg">99.4%</p>
              <p className="truncate">Layout accuracy</p>
            </div>
          </div>
        </div>

        <div className="animate-float relative order-1 lg:order-2">
          <div className="bg-gradient-primary absolute -inset-4 -z-10 rounded-[2rem] opacity-20 blur-3xl sm:-inset-6 sm:rounded-[2.5rem]" />
          <img
            src={heroImg}
            alt="PDFLingo translating an English document into Hindi while preserving layout"
            width={1536}
            height={1024}
            loading="eager"
            className="shadow-glow w-full rounded-2xl sm:rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
