import { Link } from "@tanstack/react-router";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/translate", label: "Translate PDF" },
    { to: "/faq", label: "FAQ" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="glass-strong shadow-soft flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-gradient-primary shadow-glow grid h-9 w-9 place-items-center rounded-xl">
              <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              PDF<span className="text-gradient">Lingo</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                activeProps={{ className: "text-foreground bg-accent/60" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/translate"
              className="bg-gradient-primary shadow-glow hover:shadow-card inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          <button
            className="hover:bg-accent rounded-lg p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="glass-strong shadow-soft animate-fade-up mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:bg-accent rounded-lg px-4 py-3 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/translate"
              onClick={() => setOpen(false)}
              className="bg-gradient-primary mt-1 rounded-lg px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
