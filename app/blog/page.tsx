import type { Metadata } from "next";
import Link from "next/link";

import AnimatedContent from "@/components/reactbits/AnimatedContent";
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
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-28 md:px-10 md:pt-28 md:pb-36">
      <SectionHead
        label="Blog"
        title="Yazılar"
        note="Topluluktan uzun yazılar. Notlar arşivinin yanında, daha anlatı odaklı."
      />

      {posts.length > 0 ? (
        <ul className="mt-14 md:mt-20">
          {posts.map((post, index) => (
            <AnimatedContent
              key={post.href}
              distance={26}
              duration={0.55}
              delay={Math.min(index, 5) * 0.05}
              threshold={0.1}
            >
              <li className="border-t border-rule last:border-b">
                <Link
                  href={post.href}
                  className="focus-ring group grid grid-cols-1 gap-x-8 gap-y-3 py-6 transition-colors hover:bg-foreground/[0.025] md:grid-cols-12 md:items-baseline md:py-8"
                >
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs text-muted-foreground transition-colors md:col-span-2 group-hover:text-primary"
                  >
                    {formatDate(post.date)}
                  </time>

                  <div className="md:col-span-7">
                    <h2 className="display text-display-2xs transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-body text-muted-foreground">
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

                  <span className="font-mono text-xs text-muted-foreground md:col-span-3 md:text-right">
                    {post.readingMinutes} dk okuma
                  </span>
                </Link>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      ) : (
        <p className="mt-14 border-t border-rule pt-8 text-sm text-muted-foreground md:mt-20">
          Henüz yayınlanmış bir yazı yok.
        </p>
      )}
    </div>
  );
}
