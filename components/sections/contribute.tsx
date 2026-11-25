import { ArrowUpRight } from "lucide-react";

import { Action } from "@/components/action";
import { SectionHead } from "@/components/section-head";
import { siteConfig } from "@/lib/site";

const steps = [
  "Konunun içerikte nereye oturduğunu belirle",
  "Bilgiyi güvenilir kaynaklarla doğrula",
  "Teorik anlatım yerine teknik ve anlaşılır yaz",
  "Kod örneklerini küçük tut",
  "Kaynakları notun sonunda belirt",
];

const documents = [
  {
    name: "CONTRIBUTING.md",
    description: "Katkı süreci ve içerik standartları",
    href: siteConfig.links.contributing,
  },
  {
    name: "SABLON.md",
    description: "Notların takip ettiği yapı",
    href: siteConfig.links.template,
  },
  {
    name: "TERIMLER.md",
    description: "Hangi terim Türkçe, hangisi İngilizce",
    href: siteConfig.links.terms,
  },
  {
    name: "CODE_OF_CONDUCT.md",
    description: "Topluluk davranış kuralları",
    href: siteConfig.links.codeOfConduct,
  },
];

export function Contribute() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-24 md:px-8 md:pt-24 md:pb-32">
      <SectionHead
        label="Katkı"
        title={
          <>
            İzin beklemene
            <br />
            gerek yok
          </>
        }
        note="Her bölümün README'sinde üstlenilmemiş konular listelenir"
      />

      <div className="mt-12 grid gap-y-12 md:mt-16 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-6">
          <p className="measure text-lead text-secondary-text">
            Birini üstlen, yaz, pull request gönder.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Action href={siteConfig.links.contributing} external>
              Katkı rehberi
            </Action>
            <Action href={siteConfig.links.issues} variant="quiet" external>
              <span>Açık issue&apos;lar</span>
              <ArrowUpRight className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            </Action>
          </div>
        </div>

        <ol className="md:col-span-5 md:col-start-8">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex items-baseline gap-6 border-t border-rule py-4 last:border-b"
            >
              <span className="label text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-secondary-text">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 md:mt-28">
        <p className="label text-muted-foreground">Başlamadan önce oku</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {documents.map((doc) => (
            <li key={doc.name}>
              <a
                href={doc.href}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring group flex items-start justify-between gap-4 rounded-xl border border-rule bg-card p-5 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/20 hover:bg-secondary"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm font-medium text-foreground transition-colors duration-150 group-hover:text-brand">
                    {doc.name}
                  </span>
                  <span className="text-sm text-secondary-text">
                    {doc.description}
                  </span>
                </div>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
