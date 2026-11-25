import { ArrowRight } from "lucide-react";

import { Action } from "@/components/action";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-24">
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="label text-muted-foreground">
            Açık kaynak Türkçe OSDev topluluğu
          </p>

          <h1 className="display mt-4 text-display-lg">
            İşletim sistemi yazanlar burada buluşuyor
          </h1>

          <p className="measure mt-5 text-lead text-secondary-text">
            Bootloader&apos;dan kernel&apos;a 13 bölümlük açık kaynak Türkçe not
            arşivi ve sistem geliştiricileri topluluğu.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Action href={siteConfig.links.github} external>
              Topluluğa katıl
            </Action>
            <Action href="/konular" variant="secondary">
              <span>Notlara göz at</span>
              <ArrowRight
                className="ml-2 size-4 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden
              />
            </Action>
          </div>
        </div>
      </div>
    </section>
  );
}
