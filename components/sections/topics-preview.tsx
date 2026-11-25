import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Action } from "@/components/action";
import { topics } from "@/lib/topics";

// Ana sayfada arşivin ilk dört bölümü görünür; tamamı Konular sayfasındadır.
const preview = topics.slice(0, 4);

export function TopicsPreview() {
  return (
    <section className="border-t border-rule py-20 md:py-24">
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="label text-muted-foreground">Not arşivinden</p>
          <Action href="/konular" variant="quiet">
            <span>{topics.length} bölümün tamamı</span>
            <ArrowRight className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          </Action>
        </div>

        <ul className="mt-8 md:mt-10">
          {preview.map((topic) => (
            <li key={topic.index} className="border-t border-rule last:border-b">
              <a
                href={topic.path}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring group grid grid-cols-1 gap-x-8 gap-y-2 py-5 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-card md:grid-cols-12 md:items-baseline md:px-3 md:py-6"
              >
                <span className="label text-muted-foreground transition-colors duration-150 md:col-span-1 group-hover:text-brand">
                  {topic.index}
                </span>
                <h3 className="display text-display-2xs transition-colors duration-150 md:col-span-4 group-hover:text-foreground">
                  {topic.title}
                </h3>
                <span className="flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground md:col-span-7 md:justify-end">
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
    </section>
  );
}
