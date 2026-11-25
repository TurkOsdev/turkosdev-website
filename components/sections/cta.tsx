import { Action } from "@/components/action";
import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <section className="border-t border-rule py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[76rem] gap-y-8 px-6 md:grid-cols-12 md:items-end md:gap-x-12 md:px-8">
        <h2 className="display text-display-sm md:col-span-7">
          Topluluk katkıyla büyür
        </h2>

        <div className="flex flex-wrap items-center gap-5 md:col-span-5 md:justify-end">
          <Action href={siteConfig.links.github} external>
            GitHub&apos;da katıl
          </Action>
          <Action href={siteConfig.links.issues} variant="quiet" external>
            Açık issue&apos;lara bak
          </Action>
        </div>
      </div>
    </section>
  );
}
