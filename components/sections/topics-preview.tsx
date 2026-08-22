import { Action } from "@/components/action";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { topics } from "@/lib/topics";

// Ana sayfada arşivin ilk dört bölümü görünür; tamamı Konular sayfasındadır.
const preview = topics.slice(0, 4);

export function TopicsPreview() {
  return (
    <section className="border-t border-rule py-20 md:py-28">
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="label text-muted-foreground">Not arşivinden</p>
          <Action href="/konular" variant="quiet">
            {topics.length} bölümün tamamı
          </Action>
        </div>

        <ul className="mt-10 md:mt-14">
          {preview.map((topic, index) => (
            <AnimatedContent
              key={topic.index}
              distance={26}
              duration={0.55}
              delay={index * 0.06}
              threshold={0.1}
            >
              <li className="border-t border-rule last:border-b">
                <a
                  href={topic.path}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-ring group grid grid-cols-1 gap-x-8 gap-y-2 py-5 transition-colors hover:bg-foreground/[0.025] md:grid-cols-12 md:items-baseline md:py-6"
                >
                  <span className="font-mono text-xs text-muted-foreground transition-colors md:col-span-1 group-hover:text-primary">
                    {topic.index}
                  </span>
                  <h3 className="display text-display-2xs transition-colors md:col-span-4 group-hover:text-primary">
                    {topic.title}
                  </h3>
                  <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground md:col-span-7 md:justify-end">
                    <span className="md:text-right">
                      {topic.keywords.join(" · ")}
                    </span>
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
    </section>
  );
}
