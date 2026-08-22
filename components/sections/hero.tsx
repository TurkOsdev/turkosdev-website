import { HeroWaves } from "@/components/hero-waves";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[76rem] px-6 pt-10 md:px-10 md:pt-20">
        <p className="label">Türkçe OSDev bilgi tabanı</p>

        <h1 className="display mt-8 text-[clamp(3rem,8.2vw,7rem)] md:mt-10">
          İşletim sistemi geliştirmeyi
          <br />
          <em className="italic text-primary">Türkçe</em> öğren
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-16">
          <p className="measure text-[1.0625rem] leading-relaxed text-muted-foreground md:col-span-7 md:col-start-1">
            Bootloader&apos;dan scheduler&apos;a, paging&apos;den dosya
            sistemlerine kadar; farklı kaynaklara dağılmış bilgileri tek bir
            yerde toplayan açık kaynak bir bilgi tabanı.
          </p>

          <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-9 md:items-end">
            <a
              href={siteConfig.links.notes}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Notlara başla
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
            >
              Topluluğa katıl
            </a>
          </div>
        </div>

        <p className="mt-14 font-mono text-xs text-muted-foreground md:mt-20">
          13 bölüm <span className="px-2 text-rule">/</span> 4 mimari
          <span className="px-2 text-rule">/</span> MIT lisansı
        </p>
      </div>

      {/* Kenardan kenara uzanan ufuk şeridi. Bölüm ayırıcı görevini de görür. */}
      <div className="relative mt-16 h-[34vh] min-h-[240px] w-full overflow-hidden bg-[#0e0304] md:mt-24 md:h-[40vh]">
        {/* Sahne şeritten daha uzun render edilip alttan kırpılır: ufuk pusu
            yerine dalga gövdesi görünür, kompozisyon fotoğraf kırpımı gibi olur. */}
        <div className="absolute inset-x-0 bottom-0 h-[240%]">
          <HeroWaves />
        </div>
      </div>
    </section>
  );
}
