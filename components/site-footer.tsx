import Image from "next/image";
import Link from "next/link";

import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { topics } from "@/lib/topics";

const columns = [
  {
    title: "Topluluk",
    links: [
      { label: "GitHub organizasyonu", href: siteConfig.links.github, external: true },
      { label: "OSDev notları", href: siteConfig.links.notes, external: true },
      { label: "Ekip", href: "/ekip", external: false },
      { label: "Issue aç", href: siteConfig.links.issues, external: true },
    ],
  },
  {
    title: "Katkı",
    links: [
      { label: "Katkı rehberi", href: siteConfig.links.contributing, external: true },
      { label: "Not şablonu", href: siteConfig.links.template, external: true },
      { label: "Terim sözlüğü", href: siteConfig.links.terms, external: true },
      { label: "Davranış kuralları", href: siteConfig.links.codeOfConduct, external: true },
    ],
  },
];

export function SiteFooter() {
  const startTopics = topics.slice(0, 4);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/turkosdevlogo.png"
                alt=""
                width={28}
                height={28}
                className="size-7"
              />
              <span className="font-heading text-sm font-semibold tracking-tight">
                Türk<span className="text-primary">OSDev</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Türkçe işletim sistemi geliştirme ve düşük seviye programlama
              kaynakları.
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
            >
              <GithubIcon className="size-4" aria-hidden />
              github.com/TurkOsdev
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
              <h2 className="text-xs font-medium tracking-[0.18em] text-foreground uppercase">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Başlangıç konuları" className="flex flex-col gap-3">
            <h2 className="text-xs font-medium tracking-[0.18em] text-foreground uppercase">
              Başlangıç
            </h2>
            <ul className="flex flex-col gap-2.5">
              {startTopics.map((topic) => (
                <li key={topic.index}>
                  <a
                    href={topic.path}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. İçerikler MIT
            lisansı ile paylaşılmaktadır.
          </p>
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Bu site açık kaynak
          </a>
        </div>
      </div>
    </footer>
  );
}
