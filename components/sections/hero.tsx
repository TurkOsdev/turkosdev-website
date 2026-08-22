import Link from "next/link";

import { HeroWaves } from "@/components/hero-waves";
import ShinyText from "@/components/reactbits/ShinyText";
import SplitText from "@/components/reactbits/SplitText";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    // Yükseklik, yapışkan başlık (70px) çıkarılarak tam bir ekrana denk gelir.
    <section className="relative isolate flex min-h-[calc(100svh-70px)] flex-col justify-center overflow-hidden">
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

      {/*
        Alt boşluk üsttekinden fazla: ortalama, yapışkan başlığın 70px’lik payını ve
        alttaki kaydırma okunun görsel ağırlığını dengeleyecek kadar yukarı kayar.
      */}
      <div className="mx-auto w-full max-w-[76rem] px-6 pt-8 pb-32 md:px-10 md:pt-10 md:pb-36">
        <ShinyText
          text="Açık kaynak Türkçe OSDev topluluğu"
          speed={5}
          color="var(--muted-foreground)"
          shineColor="var(--foreground)"
          className="label"
        />

        <h1 className="mt-7 text-display-lg md:mt-9">
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

        <p className="measure mt-8 text-lead text-muted-foreground">
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

      <a
        href="#topluluk"
        className="group absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground md:bottom-9"
      >
        <span
          aria-hidden
          className="text-[0.625rem] tracking-[0.16em] uppercase"
        >
          Aşağı kaydır
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          className="scroll-hint size-4"
        >
          <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
        </svg>
        <span className="sr-only">Aşağı kaydır</span>
      </a>
    </section>
  );
}
