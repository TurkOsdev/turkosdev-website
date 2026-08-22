import { Action } from "@/components/action";
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
            <Action href={siteConfig.links.github} external>
              GitHub&apos;da katıl
            </Action>
            <Action href={siteConfig.links.issues} variant="quiet" external>
              Açık issue&apos;lara bak
            </Action>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
