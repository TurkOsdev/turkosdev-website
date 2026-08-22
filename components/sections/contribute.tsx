import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { siteConfig } from "@/lib/site";

const steps = [
  "Konunun içerikte nereye oturduğunu belirle.",
  "Bilgiyi güvenilir kaynaklarla doğrula.",
  "Teorik anlatım yerine teknik ve anlaşılır yaz.",
  "Kod örneklerini küçük tut.",
  "Kaynakları notun sonunda belirt.",
];

const documents = [
  {
    name: "CONTRIBUTING.md",
    description: "Katkı süreci ve içerik standartları",
    href: siteConfig.links.contributing,
  },
  {
    name: "SABLON.md",
    description: "Notların takip ettiği yapı",
    href: siteConfig.links.template,
  },
  {
    name: "TERIMLER.md",
    description: "Hangi terim Türkçe, hangisi İngilizce",
    href: siteConfig.links.terms,
  },
  {
    name: "CODE_OF_CONDUCT.md",
    description: "Topluluk davranış kuralları",
    href: siteConfig.links.codeOfConduct,
  },
];

export function Contribute() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-12 pb-28 md:px-10 md:pt-20 md:pb-36">
      <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-16">
        <div className="md:col-span-6">
          <p className="label">Katkı</p>
          <h1 className="display mt-6 text-[clamp(1.75rem,4vw,3rem)]">
            İzin beklemene
            <br />
            gerek yok
          </h1>
          <p className="measure mt-7 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Her bölümün README&apos;sinde işaretsiz konular listelenir.
            Birini üstlen, yaz, pull request gönder.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={siteConfig.links.contributing}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Katkı rehberi
            </a>
            <a
              href={siteConfig.links.issues}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
            >
              Açık issue&apos;lar
            </a>
          </div>
        </div>

        <AnimatedContent
          distance={30}
          duration={0.6}
          threshold={0.15}
          className="md:col-span-5 md:col-start-8 md:pt-16"
        >
          <ol>
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex gap-6 border-t border-rule py-4 last:border-b"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </AnimatedContent>
      </div>

      <div className="mt-24 md:mt-32">
        <p className="label">Başlamadan önce oku</p>
        <ul className="mt-8 grid gap-x-16 gap-y-7 sm:grid-cols-2 md:max-w-4xl">
          {documents.map((doc) => (
            <li key={doc.name}>
              <a
                href={doc.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex flex-col gap-1 outline-none"
              >
                <span className="font-mono text-sm text-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary">
                  {doc.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {doc.description}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
