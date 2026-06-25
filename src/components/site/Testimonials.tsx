import { Star } from "lucide-react";

const QUOTES = [
  {
    name: "Amara Okafor",
    role: "Localization Lead, Northwind",
    quote:
      "We translated 400 product manuals into 12 languages in a single afternoon. The layout came through perfectly — tables, footnotes, everything.",
  },
  {
    name: "Lukas Berger",
    role: "Founder, Helix Legal",
    quote:
      "I've tried every PDF translator out there. PDFLingo is the first one that didn't ruin the formatting of our contracts.",
  },
  {
    name: "Mei Tanaka",
    role: "Researcher, Kyoto University",
    quote:
      "Academic papers with equations and figures, translated cleanly into Japanese. It feels like magic.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Loved by teams worldwide
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Trusted to ship documents that <span className="text-gradient">look right</span>
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="glass-strong shadow-soft flex h-full flex-col rounded-2xl p-6"
          >
            <div className="text-primary flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed">"{q.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="bg-gradient-primary grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white">
                {q.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold">{q.name}</p>
                <p className="text-muted-foreground text-xs">{q.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
