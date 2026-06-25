# PDFLingo — AI PDF Translator

PDFLingo translates PDF documents into 100+ languages while preserving the
original layout, tables, images, fonts and spacing. Runs entirely in the
browser for privacy.

## Quick start

```bash
bun install        # or: npm install
bun run dev        # http://localhost:8080
bun run build      # production build
```

## Translation providers (optional)

By default PDFLingo uses the free MyMemory API. To use DeepL or Google
Translate, create a `.env` file:

```
VITE_DEEPL_API_KEY=your_deepl_key
VITE_GOOGLE_TRANSLATE_API_KEY=your_google_key
```

## Deploy

- **Vercel / Netlify / Cloudflare Pages**: import the repo, build command
  `bun run build`, output dir `dist`.
- **Docker**: `docker build -t pdflingo . && docker run -p 8080:8080 pdflingo`
- **Self-host**: any static host works — upload the `dist/` folder.

## Import into your GitHub repo

```bash
unzip pdflingo-source.zip -d pdflingo
cd pdflingo
git init
git add .
git commit -m "Initial commit: PDFLingo"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Developed by **Sarthak**.
