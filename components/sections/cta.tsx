import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <section className="border-t border-rule py-28 md:py-40">
      <div className="mx-auto grid w-full max-w-[76rem] gap-y-12 px-6 md:grid-cols-12 md:items-end md:gap-x-16 md:px-10">
        <h2 className="display text-[clamp(2.5rem,5.5vw,4.5rem)] md:col-span-8">
          Türkçe bir OSDev bilgi tabanı
          <br />
          birlikte büyür
        </h2>

        <div className="flex flex-col items-start gap-5 md:col-span-3 md:col-start-10 md:items-end md:pb-4">
          <a
            href={siteConfig.links.notes}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Depoyu incele
          </a>
          <a
            href={siteConfig.links.issues}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
          >
            Eksik gördüğün konu için issue aç
          </a>
        </div>
      </div>
    </section>
  );
}
