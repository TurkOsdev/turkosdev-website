import Link from "next/link";
import { ArrowRight } from "lucide-react";

const paths = [
  {
    index: "01",
    title: "Öğren",
    description: "Bootloader'dan scheduler'a 13 bölümlük Türkçe not arşivi",
    href: "/konular",
  },
  {
    index: "02",
    title: "Katkı ver",
    description: "Boş bir konuyu üstlen, kaynaklarını doğrula ve pull request gönder",
    href: "/katki",
  },
  {
    index: "03",
    title: "Tanış",
    description: "Topluluğu kuran ve notlara katkı veren geliştiriciler",
    href: "/ekip",
  },
];

export function Community() {
  return (
    <section
      id="topluluk"
      className="scroll-mt-16 border-t border-rule py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[76rem] px-6 md:px-8">
        <p className="label text-muted-foreground">Toplulukta ne yapıyoruz</p>

        <ul className="mt-8 grid grid-cols-1 divide-y divide-rule border-y border-rule md:mt-10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {paths.map((path) => (
            <li key={path.index}>
              <Link
                href={path.href}
                className="focus-ring group flex h-full flex-col justify-between p-6 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-card md:p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="label text-muted-foreground transition-colors duration-150 group-hover:text-brand">
                      {path.index}
                    </span>
                    <ArrowRight
                      className="size-4 text-muted-foreground transition-[color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:text-foreground"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <h2 className="display mt-8 text-display-xs transition-colors duration-150 group-hover:text-foreground">
                    {path.title}
                  </h2>
                  <p className="mt-3 text-body text-secondary-text">
                    {path.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
