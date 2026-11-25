import type { Metadata } from "next";
import Link from "next/link";

import { SectionHead } from "@/components/section-head";
import { formatDate, getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const title = "Blog";
const description =
  "Kernel, bootloader, bellek yönetimi ve düşük seviye programlama üzerine Türkçe yazılar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-24 md:px-8 md:pt-24 md:pb-32">
      <SectionHead
        label="Blog"
        title="Yazılar"
        note="Topluluktan uzun yazılar. Notlar arşivinin yanında, daha anlatı odaklı"
      />

      {posts.length > 0 ? (
        <ul className="mt-12 md:mt-16">
          {posts.map((post) => (
            <li key={post.href} className="border-t border-rule last:border-b">
              <Link
                href={post.href}
                className="focus-ring group grid grid-cols-1 gap-x-8 gap-y-3 py-6 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-card md:grid-cols-12 md:items-baseline md:px-3 md:py-8"
              >
                <time
                  dateTime={post.date}
                  className="label text-muted-foreground transition-colors duration-150 md:col-span-2 group-hover:text-brand"
                >
                  {formatDate(post.date)}
                </time>

                <div className="md:col-span-7">
                  <h2 className="display text-display-2xs transition-colors duration-150 group-hover:text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-body text-secondary-text">
                    {post.description}
                  </p>
                  {/* Satırın tamamı bağlantı; e-posta iç içe bağlantı olmasın diye düz metin. */}
                  <p className="mt-4 flex flex-col gap-1 text-sm text-muted-foreground">
                    {post.authors.map((author) => (
                      <span key={author.name}>
                        <span className="text-foreground">{author.name}</span>
                        {author.email ? ` <${author.email}>` : null}
                      </span>
                    ))}
                  </p>
                </div>

                <span className="label text-muted-foreground md:col-span-3 md:text-right">
                  {post.readingMinutes} dk okuma
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 border-t border-rule pt-8 text-sm text-secondary-text md:mt-16">
          Henüz yayınlanmış bir yazı yok.
        </p>
      )}
    </div>
  );
}
