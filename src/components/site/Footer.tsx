import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/60 mt-24 border-t">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-gradient-primary shadow-glow grid h-9 w-9 place-items-center rounded-xl">
                <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight">
                PDF<span className="text-gradient">Lingo</span>
              </span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-sm text-sm">
              AI-powered PDF translation that preserves your layout, tables and design across
              100+ languages.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
              <li><Link to="/translate" className="hover:text-foreground">Translate PDF</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-border/60 text-muted-foreground mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} PDFLingo. All rights reserved.</p>
          <p>
            Developed by <span className="text-gradient font-semibold">Sarthak</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
