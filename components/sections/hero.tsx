import Link from "next/link";

import { HeroWaves } from "@/components/hero-waves";
import ShinyText from "@/components/reactbits/ShinyText";
import SplitText from "@/components/reactbits/SplitText";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[74svh] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroWaves />
        {/* Üstte menü, altta sayfa geçişi için iki işlevsel sönümleme. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[26rem] bg-linear-to-b from-background via-background/80 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background to-transparent"
        />
      </div>

      <div className="mx-auto w-full max-w-[76rem] px-6 pt-14 md:px-10 md:pt-20">
        <ShinyText
          text="Açık kaynak Türkçe OSDev topluluğu"
          speed={5}
          color="var(--muted-foreground)"
          shineColor="var(--foreground)"
          className="label"
        />

        <h1 className="mt-7 text-[clamp(1.75rem,4.6vw,3.75rem)] md:mt-9">
          <span className="block leading-[0.92]">
            <SplitText
              tag="span"
              text="İşletim sistemi yazanlar"
              className="display pb-[0.1em]"
              textAlign="left"
              splitType="chars"
              delay={22}
              duration={0.9}
              from={{ opacity: 0, y: 48 }}
              to={{ opacity: 1, y: 0 }}
            />
          </span>
          <span className="block leading-[0.92]">
            <SplitText
              tag="span"
              text="burada buluşuyor"
              className="display pb-[0.1em]"
              textAlign="left"
              splitType="chars"
              delay={22}
              duration={0.9}
              from={{ opacity: 0, y: 48 }}
              to={{ opacity: 1, y: 0 }}
            />
          </span>
        </h1>

        <p className="measure mt-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
          Birlikte öğreniyor, Türkçe kaynak üretiyor ve kernel yazıyoruz.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Topluluğa katıl
          </a>
          <Link
            href="/konular"
            className="text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
          >
            Notlara göz at
          </Link>
        </div>
      </div>
    </section>
  );
}
