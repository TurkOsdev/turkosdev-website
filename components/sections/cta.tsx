import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <section className="border-t border-rule py-24 md:py-32">
      <AnimatedContent distance={40} duration={0.7} threshold={0.2}>
        <div className="mx-auto grid w-full max-w-[76rem] gap-y-10 px-6 md:grid-cols-12 md:items-end md:gap-x-16 md:px-10">
          <h2 className="display text-display-sm md:col-span-7">
            Topluluk katkıyla büyür
          </h2>

          <div className="flex flex-col items-start gap-5 md:col-span-4 md:col-start-9 md:items-end md:pb-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              GitHub&apos;da katıl
            </a>
            <a
              href={siteConfig.links.issues}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
            >
              Açık issue&apos;lara bak
            </a>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
