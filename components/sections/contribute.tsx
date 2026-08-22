import { Action } from "@/components/action";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { SectionHead } from "@/components/section-head";
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
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-28 md:px-10 md:pt-28 md:pb-36">
      <SectionHead
        label="Katkı"
        title={
          <>
            İzin beklemene
            <br />
            gerek yok
          </>
        }
        note="Her bölümün README'sinde üstlenilmemiş konular listelenir."
      />

      <div className="mt-14 grid gap-y-12 md:mt-20 md:grid-cols-12 md:gap-x-16">
        <div className="md:col-span-6">
          <p className="measure text-lead text-muted-foreground">
            Birini üstlen, yaz, pull request gönder.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Action href={siteConfig.links.contributing} external>
              Katkı rehberi
            </Action>
            <Action href={siteConfig.links.issues} variant="quiet" external>
              Açık issue&apos;lar
            </Action>
          </div>
        </div>

        <AnimatedContent
          distance={30}
          duration={0.6}
          threshold={0.15}
          className="md:col-span-5 md:col-start-8"
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
                <span className="text-body text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </AnimatedContent>
      </div>

      <div className="mt-24 md:mt-32">
        <p className="label text-muted-foreground">Başlamadan önce oku</p>
        <ul className="mt-8 grid gap-x-16 gap-y-7 sm:grid-cols-2 md:max-w-4xl">
          {documents.map((doc) => (
            <li key={doc.name}>
              <a
                href={doc.href}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring group inline-flex flex-col gap-1"
              >
                <span className="font-mono text-sm text-foreground transition-colors group-hover:text-primary">
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
