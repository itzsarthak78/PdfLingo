import { Code2, Github, Rocket, Terminal } from "lucide-react";

export function SelfHost() {
  return (
    <section id="self-host" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Open & self-hostable
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Get the source code &amp; <span className="text-gradient">host it yourself</span>
        </h2>
        <p className="text-muted-foreground mt-4">
          PDFLingo runs entirely in the browser. Clone, install, deploy — no servers, no
          databases required for the core translator.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <div className="glass-strong shadow-soft rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-primary shadow-glow grid h-10 w-10 place-items-center rounded-xl">
              <Terminal className="h-5 w-5 text-white" />
            </span>
            <h3 className="font-semibold">Run locally</h3>
          </div>
          <pre className="bg-foreground/95 mt-5 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-white">
{`# 1. Clone the project
git clone https://github.com/your-org/pdflingo.git
cd pdflingo

# 2. Install dependencies (bun, pnpm or npm)
bun install

# 3. (Optional) create .env for paid translation APIs
cp .env.example .env

# 4. Start the dev server
bun run dev`}
          </pre>
        </div>

        <div className="glass-strong shadow-soft rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-primary shadow-glow grid h-10 w-10 place-items-center rounded-xl">
              <Rocket className="h-5 w-5 text-white" />
            </span>
            <h3 className="font-semibold">Deploy to production</h3>
          </div>
          <ul className="text-muted-foreground mt-5 space-y-3 text-sm">
            <li>
              <strong className="text-foreground">Vercel / Netlify / Cloudflare Pages</strong> —
              connect your repo, framework preset “TanStack Start”, build command{" "}
              <code className="bg-muted rounded px-1.5 py-0.5">bun run build</code>, output{" "}
              <code className="bg-muted rounded px-1.5 py-0.5">.output</code>.
            </li>
            <li>
              <strong className="text-foreground">Custom server</strong> — run{" "}
              <code className="bg-muted rounded px-1.5 py-0.5">bun run build</code> then{" "}
              <code className="bg-muted rounded px-1.5 py-0.5">node .output/server/index.mjs</code>.
            </li>
            <li>
              <strong className="text-foreground">Docker</strong> — base image{" "}
              <code className="bg-muted rounded px-1.5 py-0.5">oven/bun:1</code>, copy project,
              run build, expose port 3000.
            </li>
            <li>
              Add your env vars (below) in the host's dashboard before the first build.
            </li>
          </ul>
        </div>

        <div className="glass-strong shadow-soft rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-primary shadow-glow grid h-10 w-10 place-items-center rounded-xl">
              <Code2 className="h-5 w-5 text-white" />
            </span>
            <h3 className="font-semibold">APIs &amp; environment variables</h3>
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            PDFLingo uses three building blocks. The default stack works with zero keys; add
            a paid provider for production volume.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="text-muted-foreground border-border/60 border-b">
                  <th className="py-2 pr-4 font-medium">Service</th>
                  <th className="py-2 pr-4 font-medium">Endpoint</th>
                  <th className="py-2 pr-4 font-medium">Env var</th>
                  <th className="py-2 font-medium">Required?</th>
                </tr>
              </thead>
              <tbody className="divide-border/40 divide-y">
                <tr>
                  <td className="py-3 pr-4 font-semibold">MyMemory Translate</td>
                  <td className="py-3 pr-4">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                      https://api.mymemory.translated.net/get
                    </code>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">—</td>
                  <td className="py-3 text-muted-foreground">Default, no key</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">DeepL API</td>
                  <td className="py-3 pr-4">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                      https://api-free.deepl.com/v2/translate
                    </code>
                  </td>
                  <td className="py-3 pr-4">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                      VITE_DEEPL_API_KEY
                    </code>
                  </td>
                  <td className="py-3 text-muted-foreground">Optional</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">Google Cloud Translation</td>
                  <td className="py-3 pr-4">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                      https://translation.googleapis.com/language/translate/v2
                    </code>
                  </td>
                  <td className="py-3 pr-4">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                      VITE_GOOGLE_TRANSLATE_API_KEY
                    </code>
                  </td>
                  <td className="py-3 text-muted-foreground">Optional</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">pdfjs-dist</td>
                  <td className="py-3 pr-4 text-muted-foreground">npm package</td>
                  <td className="py-3 pr-4 text-muted-foreground">—</td>
                  <td className="py-3 text-muted-foreground">Bundled</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">pdf-lib + fontkit</td>
                  <td className="py-3 pr-4 text-muted-foreground">npm package</td>
                  <td className="py-3 pr-4 text-muted-foreground">—</td>
                  <td className="py-3 text-muted-foreground">Bundled</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">Noto Sans (Unicode font)</td>
                  <td className="py-3 pr-4">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                      cdn.jsdelivr.net/gh/googlefonts/noto-sans
                    </code>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">—</td>
                  <td className="py-3 text-muted-foreground">Public CDN</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground mt-5 text-xs">
            Provider order at runtime: DeepL → Google → MyMemory. The first provider with a
            valid key wins.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-primary shadow-glow inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
            <a
              href="#"
              className="glass hover:shadow-soft inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              <Download className="h-4 w-4" />
              Download .zip
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Download(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
