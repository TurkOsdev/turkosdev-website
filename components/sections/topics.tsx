import { ArrowUpRight } from "lucide-react";

import { SectionHead } from "@/components/section-head";
import { topics } from "@/lib/topics";

export function Topics() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-24 md:px-8 md:pt-24 md:pb-32">
      <SectionHead
        label="Konular"
        title="On üç bölüm"
        note="Temel bileşenlerden başlayıp sürücüler, ağ ve grafiğe ilerler"
      />

      <ul className="mt-12 md:mt-16">
        {topics.map((topic) => (
          <li key={topic.index} className="border-t border-rule last:border-b">
            <a
              href={topic.path}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring group grid grid-cols-1 gap-x-8 gap-y-3 py-6 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-card md:grid-cols-12 md:items-baseline md:px-3 md:py-7"
            >
              <span className="label text-muted-foreground transition-colors duration-150 md:col-span-1 group-hover:text-brand">
                {topic.index}
              </span>

              <h2 className="display text-display-2xs transition-colors duration-150 md:col-span-3 group-hover:text-foreground">
                {topic.title}
              </h2>

              <p className="text-body text-secondary-text md:col-span-5">
                {topic.description}
              </p>

              <span className="flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground md:col-span-3 md:justify-end">
                <span className="md:text-right">
                  {topic.keywords.join(" · ")}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
