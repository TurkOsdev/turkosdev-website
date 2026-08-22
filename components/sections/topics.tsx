import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { SectionHead } from "@/components/section-head";
import { topics } from "@/lib/topics";

export function Topics() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-28 md:px-10 md:pt-28 md:pb-36">
      <SectionHead
        label="Konular"
        title="On üç bölüm"
        note="Temel bileşenlerden başlayıp sürücüler, ağ ve grafiğe ilerler."
      />

      <ul className="mt-14 md:mt-20">
        {topics.map((topic, index) => (
          <AnimatedContent
            key={topic.index}
            distance={26}
            duration={0.55}
            delay={Math.min(index, 5) * 0.05}
            threshold={0.1}
          >
            <li className="border-t border-rule last:border-b">
              <a
                href={topic.path}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring group grid grid-cols-1 gap-x-8 gap-y-3 py-6 transition-colors hover:bg-foreground/[0.025] md:grid-cols-12 md:items-baseline md:py-7"
              >
                <span className="font-mono text-xs text-muted-foreground transition-colors md:col-span-1 group-hover:text-primary">
                  {topic.index}
                </span>

                <h2 className="display text-display-2xs transition-colors md:col-span-3 group-hover:text-primary">
                  {topic.title}
                </h2>

                <p className="text-body text-muted-foreground md:col-span-5">
                  {topic.description}
                </p>

                <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground md:col-span-3 md:justify-end">
                  <span className="md:text-right">
                    {topic.keywords.join(" · ")}
                  </span>
                  {/* Bağlantının GitHub'a çıktığı hover'a gerek kalmadan görünür. */}
                  <span
                    aria-hidden
                    className="shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </li>
          </AnimatedContent>
        ))}
      </ul>
    </div>
  );
}
