import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { AuthorLine } from "@/components/author-line";
import { editUrl, formatDate, getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

/** Yalnızca `public/blogs` altındaki dosyalar sayfa olur; gerisi 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `${siteConfig.url}${post.href}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: post.authors.map((author) => ({ name: author.name })),
    alternates: {
      canonical: post.href,
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: post.authors.map((author) => author.name),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}${post.href}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "tr-TR",
        keywords: post.tags.join(", "),
        timeRequired: `PT${post.readingMinutes}M`,
        author: post.authors.map((author) => ({
          "@type": "Person",
          name: author.name,
        })),
        publisher: { "@id": `${siteConfig.url}/#organization` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-24 md:px-8 md:pt-24 md:pb-32">
      <script
        type="application/ld+json"
        // Markdown başlığından gelen metin script etiketini kapatamasın diye `<` kaçırılır.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="max-w-4xl">
        <nav aria-label="Konum" className="label text-muted-foreground">
          <Link
            href="/blog"
            className="focus-ring transition-colors duration-150 hover:text-foreground"
          >
            Blog
          </Link>
          {post.tags.length > 0 ? (
            <span aria-hidden> / {post.tags[0]}</span>
          ) : null}
        </nav>

        <h1 className="display mt-4 text-display-md">{post.title}</h1>

        <p className="measure mt-6 text-lead text-secondary-text">
          {post.description}
        </p>

        <dl className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-rule pt-6 font-mono text-xs tabular-nums text-muted-foreground">
          <div className="w-full">
            <dt className="sr-only">Yazar</dt>
            <dd className="flex flex-col gap-1.5 font-sans text-body">
              {post.authors.map((author) => (
                <AuthorLine key={author.name} author={author} />
              ))}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Yayın tarihi</dt>
            <dd>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </dd>
          </div>
          {post.updated ? (
            <div>
              <dt className="inline">Güncelleme: </dt>
              <dd className="inline">
                <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="sr-only">Okuma süresi</dt>
            <dd>{post.readingMinutes} dk okuma</dd>
          </div>
        </dl>
      </header>

      <div className="mt-12 grid gap-y-12 md:mt-16 lg:grid-cols-12 lg:gap-x-16">
        {post.headings.length > 2 ? (
          <aside className="lg:order-last lg:col-span-3 lg:col-start-10">
            <nav
              aria-label="İçindekiler"
              className="lg:sticky lg:top-[calc(64px+2rem)]"
            >
              <p className="label text-muted-foreground">İçindekiler</p>
              <ol className="mt-4 flex flex-col gap-2.5 border-l border-rule">
                {post.headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={heading.depth === 3 ? "pl-7" : "pl-4"}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="focus-ring text-sm text-secondary-text transition-colors duration-150 hover:text-foreground"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        ) : null}

        <div className="min-w-0 lg:col-span-8">
          <div
            className="prose-blog"
            // Markdown depodaki dosyalardan derleme anında üretilir, kullanıcı girdisi yok.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-rule pt-8">
            <Link
              href="/blog"
              className="focus-ring inline-flex items-center gap-2 text-sm text-secondary-text underline decoration-rule underline-offset-4 transition-colors duration-150 hover:text-foreground hover:decoration-current"
            >
              <ArrowLeft className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              <span>Tüm yazılar</span>
            </Link>
            <a
              href={editUrl(post)}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              <span>Hata mı var? GitHub&apos;da düzenle</span>
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
            </a>
          </footer>
        </div>
      </div>
    </article>
  );
}
