import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { topics } from "@/lib/topics";

export function Topics() {
  return (
    <section id="konular" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="İçerik"
          title="Temelden ileri seviyeye 13 bölüm"
          description="Notlar, işletim sistemi geliştirmenin temel bileşenlerinden başlayıp donanım sürücüleri, ağ ve grafik gibi ileri konulara doğru ilerler."
        />

        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <li key={topic.index} className="group relative bg-card">
                <a
                  href={topic.path}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-full flex-col gap-3 p-6 outline-none transition-colors hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {topic.index}
                    </span>
                  </div>

                  <h3 className="font-heading flex items-center gap-1.5 text-base font-medium">
                    {topic.title}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {topic.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="font-mono">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
