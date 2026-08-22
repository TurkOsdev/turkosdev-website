import Link from "next/link";

import AnimatedContent from "@/components/reactbits/AnimatedContent";

const paths = [
  {
    index: "01",
    title: "Öğren",
    description: "Bootloader'dan scheduler'a 13 bölümlük Türkçe not arşivi.",
    href: "/konular",
  },
  {
    index: "02",
    title: "Katkı ver",
    description: "Boş bir konuyu üstlen, pull request gönder.",
    href: "/katki",
  },
  {
    index: "03",
    title: "Tanış",
    description: "Topluluğu kuran ve kod yazan geliştiriciler.",
    href: "/ekip",
  },
];

export function Community() {
  return (
    <section className="border-t border-rule py-20 md:py-28">
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-10">
        <p className="label">Toplulukta ne yapıyoruz</p>

        <ul className="mt-10 md:mt-14">
          {paths.map((path, index) => (
            <AnimatedContent
              key={path.index}
              distance={30}
              duration={0.6}
              delay={index * 0.08}
              threshold={0.15}
            >
              <li className="border-t border-rule last:border-b">
                <Link
                  href={path.href}
                  className="group grid grid-cols-1 gap-x-8 gap-y-2 py-7 outline-none md:grid-cols-12 md:items-baseline md:py-9"
                >
                  <span className="font-mono text-xs text-muted-foreground transition-colors md:col-span-1 group-hover:text-primary">
                    {path.index}
                  </span>
                  <h2 className="display text-xl transition-colors md:col-span-4 md:text-[1.75rem] group-hover:text-primary">
                    {path.title}
                  </h2>
                  <p className="text-[0.9375rem] text-muted-foreground md:col-span-6">
                    {path.description}
                  </p>
                  <span
                    aria-hidden
                    className="hidden font-mono text-xs text-muted-foreground transition-transform md:col-span-1 md:inline md:text-right group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
