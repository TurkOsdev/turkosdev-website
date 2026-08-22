import { topics } from "@/lib/topics";

export function Topics() {
  return (
    <section id="konular" className="scroll-mt-16 py-28 md:py-40">
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-7">
            <p className="label">İçindekiler</p>
            <h2 className="display mt-6 text-[clamp(2.5rem,5vw,4rem)]">
              Temelden ileri seviyeye
              <br />
              on üç bölüm
            </h2>
          </div>
          <p className="measure-sm text-[0.9375rem] leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:pb-3">
            Notlar, temel bileşenlerden başlayıp donanım sürücüleri, ağ ve
            grafik gibi ileri konulara doğru ilerler.
          </p>
        </div>

        <ul className="mt-16 md:mt-24">
          {topics.map((topic) => (
            <li key={topic.index} className="border-t border-rule last:border-b">
              <a
                href={topic.path}
                target="_blank"
                rel="noreferrer noopener"
                className="group grid grid-cols-1 gap-x-8 gap-y-3 py-7 outline-none md:grid-cols-12 md:items-baseline md:py-8"
              >
                <span className="font-mono text-xs text-muted-foreground md:col-span-1 group-hover:text-primary group-focus-visible:text-primary">
                  {topic.index}
                </span>

                <h3 className="display text-3xl transition-colors md:col-span-3 md:text-[2rem] group-hover:text-primary group-focus-visible:text-primary">
                  {topic.title}
                </h3>

                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground md:col-span-5">
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
          ))}
        </ul>
      </div>
    </section>
  );
}
