import { Action } from "@/components/action";
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
          <Action href={siteConfig.links.github} external>
            Topluluğa katıl
          </Action>
          <Action href="/konular" variant="quiet">
            Notlara göz at
          </Action>
        </div>
      </div>

      <a
        href="#topluluk"
        className="focus-ring group absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground md:bottom-9"
      >
        <span className="label">Aşağı kaydır</span>
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
      </a>
    </section>
  );
}
