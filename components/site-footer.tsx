import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

const columns = [
  {
    title: "Topluluk",
    links: [
      { label: "Konular", href: "/konular", external: false },
      { label: "Blog", href: "/blog", external: false },
      { label: "Ekip", href: "/ekip", external: false },
      { label: "Katkı", href: "/katki", external: false },
    ],
  },
  {
    title: "GitHub",
    links: [
      { label: "Organizasyon", href: siteConfig.links.github, external: true },
      { label: "OSDev notları", href: siteConfig.links.notes, external: true },
      { label: "Issue aç", href: siteConfig.links.issues, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-5">
            <Link href="/" className="focus-ring inline-block">
              <Image
                src="/turkosdev-wordmark.png"
                alt=""
                width={495}
                height={118}
                className="h-5 w-auto"
              />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <p className="measure-sm mt-6 text-sm leading-relaxed text-muted-foreground">
              Türkçe işletim sistemi geliştirme ve düşük seviye programlama
              kaynakları.
            </p>
          </div>

          {columns.map((column, index) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={index === 0 ? "md:col-span-3 md:col-start-7" : "md:col-span-3"}
            >
              <h2 className="label text-muted-foreground">{column.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="focus-ring text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-rule pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name} — MIT
          </p>
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Bu site açık kaynak
          </a>
        </div>
      </div>
    </footer>
  );
}
