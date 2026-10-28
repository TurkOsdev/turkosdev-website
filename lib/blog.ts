import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { cache } from "react";

import rehypeShiki from "@shikijs/rehype";
import type { Element, ElementContent, Root } from "hast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { parse as parseToml } from "smol-toml";
import { unified } from "unified";

import { siteConfig } from "@/lib/site";

/**
 * Blog yazıları `public/blogs/**.md` altında durur. Her dosya `+++` ile
 * sınırlanmış bir TOML başlığıyla başlar:
 *
 *   +++
 *   baslik = "İşletim Sistemi Nasıl Yazılır?"
 *   aciklama = "Arama sonuçlarında görünen tek cümlelik özet."
 *   yazar = "Tuna Kılıç <tuna@tunakilic.com>"
 *   tarih = 2026-10-28
 *   guncelleme = 2026-11-02   # opsiyonel
 *   etiketler = ["osdev", "kernel"]  # opsiyonel
 *   taslak = true             # opsiyonel, üretimde yayınlanmaz
 *   +++
 *
 * Adres dosya adından gelir: `public/blogs/2026/ilk-yazi.md` → `/blog/ilk-yazi`.
 * Alt klasörler yalnızca düzen içindir; aynı adı taşıyan iki dosya build'i durdurur.
 * Dosyalar `public` altında olduğu için ham markdown da `/blogs/...` adresinden okunabilir.
 */
const BLOG_DIR = join(process.cwd(), "public", "blogs");

/** Türkçe teknik metin için dakikada okunan ortalama kelime. */
const WORDS_PER_MINUTE = 180;

export type Author = {
  name: string;
  email: string | null;
};

export type Heading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type PostMeta = {
  slug: string;
  href: string;
  /** Depo köküne göre markdown dosyasının yolu; "GitHub'da düzenle" bağlantısı için. */
  sourcePath: string;
  title: string;
  description: string;
  authors: Author[];
  /** ISO 8601 tarih. */
  date: string;
  updated: string | null;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
  headings: Heading[];
};

type Frontmatter = {
  baslik?: unknown;
  aciklama?: unknown;
  yazar?: unknown;
  tarih?: unknown;
  guncelleme?: unknown;
  etiketler?: unknown;
  taslak?: unknown;
};

const FRONTMATTER = /^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n?/;

async function listMarkdownFiles(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    // Klasör yoksa blog boş görünür, build kırılmaz.
    return [];
  }

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(full);
      return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
    })
  );

  return nested.flat();
}

function slugOf(file: string) {
  const parts = relative(BLOG_DIR, file).replace(/\.md$/, "").split(sep);
  // `konu/index.md` → `/blog/konu`
  if (parts.length > 1 && parts.at(-1) === "index") parts.pop();
  return parts.at(-1)!;
}

/** "Ad Soyad <eposta>" biçimini ayrıştırır; e-posta opsiyoneldir. */
function parseAuthor(value: string): Author {
  const match = /^\s*(.+?)\s*<([^>]+)>\s*$/.exec(value);
  if (match) return { name: match[1], email: match[2].trim() };
  return { name: value.trim(), email: null };
}

function parseDate(value: unknown, field: string, file: string) {
  // smol-toml tarihleri Date alt sınıfı olarak döndürür; tırnaklı tarih de kabul edilir.
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${file}: "${field}" geçerli bir tarih değil.`);
  }
  return date.toISOString();
}

function requireString(value: unknown, field: string, file: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${file}: "${field}" alanı zorunlu.`);
  }
  return value.trim();
}

function readingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parseFile(file: string, raw: string) {
  const name = relative(process.cwd(), file);
  const match = FRONTMATTER.exec(raw);
  if (!match) {
    throw new Error(`${name}: dosya +++ ile sınırlanmış bir TOML başlığıyla başlamalı.`);
  }

  const data = parseToml(match[1]) as Frontmatter;
  const body = raw.slice(match[0].length);
  const slug = slugOf(file);

  const rawAuthors = Array.isArray(data.yazar) ? data.yazar : [data.yazar];
  const authors = rawAuthors.map((author) =>
    parseAuthor(requireString(author, "yazar", name))
  );

  const meta: PostMeta = {
    slug,
    href: `/blog/${slug}`,
    sourcePath: relative(process.cwd(), file).split(sep).join("/"),
    title: requireString(data.baslik, "baslik", name),
    description: requireString(data.aciklama, "aciklama", name),
    authors,
    date: parseDate(data.tarih, "tarih", name),
    updated:
      data.guncelleme === undefined
        ? null
        : parseDate(data.guncelleme, "guncelleme", name),
    tags: Array.isArray(data.etiketler) ? data.etiketler.map(String) : [],
    draft: data.taslak === true,
    readingMinutes: readingMinutes(body),
  };

  return { meta, body };
}

/** Taslaklar geliştirmede görünür, üretim derlemesine girmez. */
function isVisible(meta: PostMeta) {
  return !meta.draft || process.env.NODE_ENV === "development";
}

const loadAll = cache(async () => {
  const files = await listMarkdownFiles(BLOG_DIR);
  const parsed = await Promise.all(
    files.map(async (file) => parseFile(file, await readFile(file, "utf8")))
  );
  const visible = parsed.filter(({ meta }) => isVisible(meta));

  const seen = new Map<string, string>();
  for (const { meta } of visible) {
    const other = seen.get(meta.slug);
    if (other) {
      throw new Error(
        `${other} ve ${meta.sourcePath} aynı adresi (/blog/${meta.slug}) kullanıyor; birinin adını değiştirin.`
      );
    }
    seen.set(meta.slug, meta.sourcePath);
  }

  return visible;
});

/** Yayındaki yazılar, en yeniden eskiye. */
export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const all = await loadAll();
  return all
    .map(({ meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const key = decodeURIComponent(slug);
  const entry = (await loadAll()).find(({ meta }) => meta.slug === key);
  if (!entry) return null;

  const { html, headings } = await renderMarkdown(entry.body);
  return { ...entry.meta, html, headings };
});

export function editUrl(post: PostMeta) {
  return `${siteConfig.links.website}/blob/main/${post.sourcePath}`;
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Istanbul",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

function textOf(node: ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
}

const TURKISH_ASCII: Record<string, string> = {
  ç: "c", ğ: "g", ı: "i", i: "i", ö: "o", ş: "s", ü: "u",
};

/**
 * Başlık metninden çapa üretir. Türkçe harfler ASCII'ye indirilir; böylece
 * paylaşılan bağlantılar `#basla` gibi okunur, `#ba%C5%9Fla` gibi değil.
 */
function slugify(text: string) {
  return text
    .toLocaleLowerCase("tr")
    .replace(/[çğıiöşü]/g, (char) => TURKISH_ASCII[char])
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

/**
 * Başlıklara benzersiz `id` verir; h2 ve h3'ü içindekiler listesi için toplar.
 */
function headingIds(target: Heading[]) {
  return () => (tree: Root) => {
    const used = new Map<string, number>();

    const walk = (nodes: Root["children"] | Element["children"]) => {
      for (const node of nodes) {
        if (node.type !== "element") continue;
        if (!/^h[1-6]$/.test(node.tagName)) {
          walk(node.children);
          continue;
        }

        const text = node.children.map(textOf).join("").trim();
        const base = slugify(text) || "baslik";
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        const id = count === 0 ? base : `${base}-${count}`;
        node.properties.id = id;

        if (node.tagName === "h2" || node.tagName === "h3") {
          target.push({ id, text, depth: node.tagName === "h2" ? 2 : 3 });
        }
      }
    };
    walk(tree.children);
  };
}

/** Dış bağlantılar yeni sekmede açılır; site içi ve çapa bağlantıları dokunulmaz. */
function externalLinks() {
  return (tree: Root) => {
    const walk = (nodes: Root["children"] | Element["children"]) => {
      for (const node of nodes) {
        if (node.type !== "element") continue;
        const href = node.properties.href;
        if (node.tagName === "a" && typeof href === "string" && /^https?:\/\//.test(href)) {
          node.properties.target = "_blank";
          node.properties.rel = ["noreferrer", "noopener"];
        }
        walk(node.children);
      }
    };
    walk(tree.children);
  };
}

async function renderMarkdown(markdown: string) {
  const headings: Heading[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(headingIds(headings))
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["heading-anchor"] },
    })
    .use(externalLinks)
    .use(rehypeShiki, { theme: "github-dark-default" })
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), headings };
}
