import { Upload, Languages, Wand2, Download } from "lucide-react";

const STEPS = [
  { icon: Upload, title: "Upload PDF", desc: "Drag in any PDF, up to 50 MB." },
  { icon: Languages, title: "Choose Language", desc: "Pick from 100+ languages." },
  { icon: Wand2, title: "Translate", desc: "AI rebuilds your layout in the new language." },
  { icon: Download, title: "Download", desc: "Get a polished, ready-to-share PDF." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          How it works
        </span>
        <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
          From upload to download in <span className="text-gradient">four steps</span>
        </h2>
      </div>

      <div className="relative mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
        <div className="bg-gradient-primary absolute top-10 right-12 left-12 hidden h-px opacity-30 md:block" />
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="glass-strong shadow-soft relative rounded-2xl p-5 text-center sm:p-6"
          >
            <div className="relative mx-auto w-fit">
              <span className="bg-gradient-primary shadow-glow grid h-14 w-14 place-items-center rounded-2xl sm:h-16 sm:w-16">
                <s.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={2.2} />
              </span>
              <span className="border-border bg-background text-foreground absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full border text-xs font-bold">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold sm:mt-5">{s.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
