import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { topics } from "@/lib/topics";

export function Topics() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-12 pb-28 md:px-10 md:pt-20 md:pb-36">
      <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-7">
          <p className="label">Konular</p>
          <h1 className="display mt-6 text-display-md">
            On üç bölüm
          </h1>
        </div>
        <p className="measure-sm text-body text-muted-foreground md:col-span-4 md:col-start-9 md:pb-3">
          Temel bileşenlerden başlayıp sürücüler, ağ ve grafiğe ilerler.
        </p>
      </div>

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
                className="group grid grid-cols-1 gap-x-8 gap-y-3 py-6 outline-none md:grid-cols-12 md:items-baseline md:py-7"
              >
                <span className="font-mono text-xs text-muted-foreground transition-colors md:col-span-1 group-hover:text-primary group-focus-visible:text-primary">
                  {topic.index}
                </span>

                <h2 className="display text-display-2xs transition-colors md:col-span-3 group-hover:text-primary group-focus-visible:text-primary">
                  {topic.title}
                </h2>

                <p className="text-body text-muted-foreground md:col-span-5">
                  {topic.description}
                </p>

                <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground md:col-span-3 md:justify-end">
                  <span className="md:text-right">{topic.keywords.join(" · ")}</span>
                  <span
                    aria-hidden
                    className="hidden opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:inline"
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
