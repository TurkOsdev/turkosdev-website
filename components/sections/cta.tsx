import { ArrowRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-14 sm:py-20">
          <div aria-hidden className="brand-glow absolute inset-0 -z-10 opacity-70" />
          <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 opacity-60" />

          <h2 className="mx-auto max-w-xl font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Türkçe bir OSDev bilgi tabanı birlikte büyür
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
            Depoyu yıldızlayın, eksik gördüğünüz bir konu için issue açın veya
            ilk pull request&apos;inizi gönderin.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={siteConfig.links.notes}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubIcon aria-hidden />
                Depoyu incele
                <ArrowRight aria-hidden data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a
                href={siteConfig.links.issues}
                target="_blank"
                rel="noreferrer noopener"
              >
                Issue aç
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
