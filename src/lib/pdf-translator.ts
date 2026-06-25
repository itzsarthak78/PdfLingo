/**
 * Client-side PDF translation pipeline.
 *
 * Strategy: keep the original PDF exactly as it is (images, lines, vector
 * shapes, page sizes, page count). For every text run we:
 *   1. Paint a thin white rectangle over the original glyphs.
 *   2. Draw the translated text in a Unicode font picked from the target
 *      language, so CJK / Arabic / Devanagari / etc. all render correctly.
 *
 * APIs:
 *  - pdfjs-dist        → extract text + coords from the uploaded PDF
 *  - pdf-lib + fontkit → copy original pages, overlay translated text
 *  - MyMemory (free)   → default translation provider, no key required
 *  - DeepL / Google    → optional, used if VITE_DEEPL_API_KEY or
 *                        VITE_GOOGLE_TRANSLATE_API_KEY is set
 *  - Noto Sans family  → Unicode fonts streamed from jsDelivr GitHub CDN,
 *                        selected per target language to avoid "WinAnsi
 *                        cannot encode" / glyph-missing errors
 */

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/* ---------- Fonts (per script) ---------- */

const NOTO_BASE =
  "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io@main/fonts";
const CJK_BASE = "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/OTF";

const FONT_FOR_LANG: Record<string, string> = {
  zh: `${CJK_BASE}/SimplifiedChinese/NotoSansSC-Regular.otf`,
  "zh-TW": `${CJK_BASE}/TraditionalChinese/NotoSansTC-Regular.otf`,
  ja: `${CJK_BASE}/Japanese/NotoSansJP-Regular.otf`,
  ko: `${CJK_BASE}/Korean/NotoSansKR-Regular.otf`,
  ar: `${NOTO_BASE}/NotoSansArabic/hinted/ttf/NotoSansArabic-Regular.ttf`,
  ur: `${NOTO_BASE}/NotoSansArabic/hinted/ttf/NotoSansArabic-Regular.ttf`,
  he: `${NOTO_BASE}/NotoSansHebrew/hinted/ttf/NotoSansHebrew-Regular.ttf`,
  hi: `${NOTO_BASE}/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf`,
  mr: `${NOTO_BASE}/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf`,
  ne: `${NOTO_BASE}/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf`,
  bn: `${NOTO_BASE}/NotoSansBengali/hinted/ttf/NotoSansBengali-Regular.ttf`,
  ta: `${NOTO_BASE}/NotoSansTamil/hinted/ttf/NotoSansTamil-Regular.ttf`,
  te: `${NOTO_BASE}/NotoSansTelugu/hinted/ttf/NotoSansTelugu-Regular.ttf`,
  th: `${NOTO_BASE}/NotoSansThai/hinted/ttf/NotoSansThai-Regular.ttf`,
};
const FALLBACK_FONT = `${NOTO_BASE}/NotoSans/hinted/ttf/NotoSans-Regular.ttf`;

const fontCache = new Map<string, ArrayBuffer>();
async function loadFont(url: string): Promise<ArrayBuffer> {
  const cached = fontCache.get(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${url}`);
  const buf = await res.arrayBuffer();
  fontCache.set(url, buf);
  return buf;
}

async function fontForLanguage(lang: string): Promise<ArrayBuffer> {
  const url = FONT_FOR_LANG[lang] ?? FALLBACK_FONT;
  try {
    return await loadFont(url);
  } catch {
    return loadFont(FALLBACK_FONT);
  }
}

/* ---------- Types ---------- */

export type Progress = {
  stage: "extracting" | "translating" | "rebuilding";
  current?: number;
  total?: number;
};

type TextItem = {
  str: string;
  x: number;
  y: number;
  fontSize: number;
  width: number;
  height: number;
};

type Page = {
  width: number;
  height: number;
  items: TextItem[];
};

/* ---------- Translation providers ---------- */

const DEEPL_KEY = (import.meta.env.VITE_DEEPL_API_KEY as string | undefined) ?? "";
const GOOGLE_KEY =
  (import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY as string | undefined) ?? "";

async function translateBatch(texts: string[], target: string): Promise<string[]> {
  if (DEEPL_KEY) return translateDeepL(texts, target);
  if (GOOGLE_KEY) return translateGoogle(texts, target);
  return translateMyMemory(texts, target);
}

async function translateDeepL(texts: string[], target: string): Promise<string[]> {
  const params = new URLSearchParams();
  texts.forEach((t) => params.append("text", t));
  params.append("target_lang", target.toUpperCase());
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const data = (await res.json()) as { translations: { text: string }[] };
  return data.translations.map((t) => t.text);
}

async function translateGoogle(texts: string[], target: string): Promise<string[]> {
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: texts, target, format: "text" }),
    },
  );
  const data = (await res.json()) as {
    data: { translations: { translatedText: string }[] };
  };
  return data.data.translations.map((t) => t.translatedText);
}

async function translateMyMemory(texts: string[], target: string): Promise<string[]> {
  const out: string[] = [];
  for (const text of texts) {
    if (!text.trim()) {
      out.push(text);
      continue;
    }
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text,
      )}&langpair=en|${encodeURIComponent(target)}`;
      const res = await fetch(url);
      const data = (await res.json()) as {
        responseData?: { translatedText?: string };
      };
      out.push(data.responseData?.translatedText ?? text);
    } catch {
      out.push(text);
    }
    await new Promise((r) => setTimeout(r, 40));
  }
  return out;
}

/* ---------- Extraction ---------- */

async function extractPages(file: File): Promise<{ pages: Page[]; bytes: ArrayBuffer }> {
  const bytes = await file.arrayBuffer();
  // pdfjs consumes the buffer, so pass a copy and keep the original for pdf-lib.
  const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
  const pages: Page[] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();

    const items: TextItem[] = [];
    for (const raw of content.items as Array<{
      str: string;
      transform: number[];
      width: number;
      height: number;
    }>) {
      if (!raw.str) continue;
      const [a, , , , e, f] = raw.transform;
      const fontSize = Math.abs(a) || raw.height || 11;
      items.push({
        str: raw.str,
        x: e,
        y: f,
        fontSize,
        width: raw.width,
        height: raw.height || fontSize,
      });
    }
    pages.push({ width: viewport.width, height: viewport.height, items });
  }
  return { pages, bytes };
}

/* ---------- Rebuild (preserve original, only swap text) ---------- */

// Strip characters that no Noto Sans variant can encode (control chars,
// stray BOMs, zero-width markers); keep everything printable.
function sanitize(text: string): string {
  return text
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\uFEFF/g, "")
    .trim();
}

async function rebuildPdf(
  originalBytes: ArrayBuffer,
  pages: Page[],
  translations: string[][],
  target: string,
): Promise<Uint8Array> {
  const srcDoc = await PDFDocument.load(originalBytes);
  srcDoc.registerFontkit(fontkit);

  const fontBytes = await fontForLanguage(target);
  const font = await srcDoc.embedFont(fontBytes, { subset: true });

  const docPages = srcDoc.getPages();
  pages.forEach((page, pi) => {
    const target = docPages[pi];
    if (!target) return;

    page.items.forEach((item, ii) => {
      const raw = translations[pi]?.[ii] ?? item.str;
      const text = sanitize(raw);
      if (!text) return;

      // Cover the original glyphs with a white rectangle so the underlying
      // text isn't visible behind the translation.
      const pad = 1;
      target.drawRectangle({
        x: item.x - pad,
        y: item.y - pad,
        width: Math.max(item.width, 4) + pad * 2,
        height: item.height + pad * 2,
        color: rgb(1, 1, 1),
      });

      // Auto-shrink the font when the translation is longer than the slot.
      let size = item.fontSize;
      const maxWidth = Math.max(item.width, 20);
      try {
        let w = font.widthOfTextAtSize(text, size);
        while (w > maxWidth && size > 5) {
          size -= 0.5;
          w = font.widthOfTextAtSize(text, size);
        }
      } catch {
        /* widthOfTextAtSize can throw on weird glyphs — keep original size */
      }

      try {
        target.drawText(text, {
          x: item.x,
          y: item.y,
          size,
          font,
          color: rgb(0.08, 0.08, 0.12),
        });
      } catch {
        // Final safety net: drop characters this font can't encode.
        const safe = [...text]
          .filter((ch) => {
            try {
              font.widthOfTextAtSize(ch, size);
              return true;
            } catch {
              return false;
            }
          })
          .join("");
        if (!safe) return;
        try {
          target.drawText(safe, {
            x: item.x,
            y: item.y,
            size,
            font,
            color: rgb(0.08, 0.08, 0.12),
          });
        } catch {
          /* give up on this run */
        }
      }
    });
  });

  return srcDoc.save();
}

/* ---------- Public entry ---------- */

export async function translatePdf(
  file: File,
  targetLang: string,
  onProgress: (p: Progress) => void,
): Promise<Blob> {
  onProgress({ stage: "extracting" });
  const { pages, bytes } = await extractPages(file);

  const translations: string[][] = [];
  for (let i = 0; i < pages.length; i++) {
    onProgress({ stage: "translating", current: i + 1, total: pages.length });
    const texts = pages[i].items.map((it) => it.str);
    translations.push(await translateBatch(texts, targetLang));
  }

  onProgress({ stage: "rebuilding" });
  const out = await rebuildPdf(bytes, pages, translations, targetLang);
  const ab = new ArrayBuffer(out.byteLength);
  new Uint8Array(ab).set(out);
  return new Blob([ab], { type: "application/pdf" });
}
