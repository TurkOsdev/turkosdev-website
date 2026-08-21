import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { HeroWaves } from "@/components/hero-waves";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const highlights = [
  { value: "13", label: "ana bölüm" },
  { value: "4", label: "mimari" },
  { value: "MIT", label: "lisans" },
  { value: "%100", label: "açık kaynak" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* WebGL dalga alanı + üstüne binen siyah geçişler */}
      <div className="absolute inset-0 -z-10">
        <HeroWaves />
        <div className="absolute inset-0 bg-linear-to-b from-background/85 via-background/35 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      </div>
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-24 pb-28 text-center sm:px-8 sm:pt-32 sm:pb-36">
        <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          Topluluk katkılarına açık
        </span>

        <h1 className="animate-fade-up mt-7 max-w-3xl font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
          İşletim sistemi geliştirmeyi{" "}
          <span className="text-primary">Türkçe</span> öğren
        </h1>

        <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg [animation-delay:120ms]">
          Bootloader&apos;dan scheduler&apos;a, paging&apos;den dosya
          sistemlerine kadar; farklı kaynaklara dağılmış bilgileri tek bir yerde
          toplayan açık kaynak bir OSDev bilgi tabanı.
        </p>

        <div className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row [animation-delay:240ms]">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a
              href={siteConfig.links.notes}
              target="_blank"
              rel="noreferrer noopener"
            >
              <BookOpen aria-hidden />
              Notlara başla
              <ArrowRight aria-hidden data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon aria-hidden />
              Topluluğa katıl
            </a>
          </Button>
        </div>

        <dl className="animate-fade-up mt-16 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4 [animation-delay:360ms]">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-0.5 bg-background/60 px-4 py-5 backdrop-blur-sm"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-heading text-2xl font-semibold tracking-tight">
                {item.value}
              </dd>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </dl>

        <Link
          href="#konular"
          className="mt-14 rounded-md text-xs tracking-wide text-muted-foreground uppercase transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
        >
          Konulara göz at ↓
        </Link>
      </div>
    </section>
  );
}
