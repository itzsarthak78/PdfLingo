import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { LANGUAGES, type Language } from "@/lib/languages";

type Props = {
  value: Language;
  onChange: (lang: Language) => void;
};

export function LanguageSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return LANGUAGES.filter(
      (l) => l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass-strong shadow-soft hover:shadow-card flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left transition-all"
      >
        <span className="flex items-center gap-3">
          <span className="text-2xl leading-none">{value.flag}</span>
          <span>
            <span className="text-muted-foreground block text-xs">Translate to</span>
            <span className="font-semibold">{value.name}</span>
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="glass-strong shadow-card animate-fade-up absolute z-30 mt-2 max-h-80 w-full overflow-hidden rounded-2xl">
          <div className="border-border/60 flex items-center gap-2 border-b px-4 py-3">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search languages..."
              className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            {filtered.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  onChange(l);
                  setOpen(false);
                  setQuery("");
                }}
                className="hover:bg-accent flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl leading-none">{l.flag}</span>
                  <span>{l.name}</span>
                </span>
                {l.code === value.code && <Check className="text-primary h-4 w-4" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-muted-foreground p-4 text-center text-sm">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
