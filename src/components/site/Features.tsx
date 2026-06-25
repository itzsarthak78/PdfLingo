import { Layout, Globe2, Sparkles, Zap, ShieldCheck, CloudOff } from "lucide-react";

const FEATURES = [
  {
    icon: Layout,
    title: "Keep Original Layout",
    desc: "Tables, columns, headers and images stay perfectly in place after translation.",
  },
  {
    icon: Globe2,
    title: "100+ Languages",
    desc: "From Spanish to Japanese, Arabic to Swahili — translate anywhere your readers are.",
  },
  {
    icon: Sparkles,
    title: "AI Powered",
    desc: "State-of-the-art neural translation tuned for tone, context and technical accuracy.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    desc: "Most documents translate in under a minute. Big reports in just a few.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Files",
    desc: "Files are encrypted in transit and auto-deleted within 24 hours.",
  },
  {
    icon: CloudOff,
    title: "No Software Installation",
    desc: "Works in your browser — nothing to install, no plugins required.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Features
        </span>
        <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
          Everything you need to translate <span className="text-gradient">beautifully</span>
        </h2>
        <p className="text-muted-foreground mt-3 text-sm sm:mt-4 sm:text-base">
          A complete toolkit for teams that care about how their documents look in every
          language.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="glass-strong shadow-soft hover:shadow-glow group rounded-2xl p-5 transition-all hover:-translate-y-1 sm:p-6"
          >
            <span className="bg-gradient-primary shadow-glow grid h-11 w-11 place-items-center rounded-xl transition-transform group-hover:rotate-6 sm:h-12 sm:w-12">
              <f.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={2.2} />
            </span>
            <h3 className="mt-4 text-base font-semibold sm:mt-5 sm:text-lg">{f.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
