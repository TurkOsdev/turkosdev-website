import { ArrowUpRight, GitPullRequest, Heart, ScrollText, Shield } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

const steps = [
  "Konunun mevcut içerikte nereye oturduğunu belirleyin.",
  "Teknik bilgileri güvenilir kaynaklarla doğrulayın.",
  "Gereksiz teori yerine anlaşılır ve teknik bir anlatım kullanın.",
  "Kod örneklerini mümkün olduğunca küçük ve açıklayıcı tutun.",
  "Kullandığınız önemli kaynakları notun sonunda belirtin.",
];

const documents = [
  {
    icon: GitPullRequest,
    title: "CONTRIBUTING.md",
    description: "Katkı süreci ve içerik standartları.",
    href: siteConfig.links.contributing,
  },
  {
    icon: ScrollText,
    title: "SABLON.md",
    description: "Notların takip ettiği yapı.",
    href: siteConfig.links.template,
  },
  {
    icon: Heart,
    title: "TERIMLER.md",
    description: "Hangi terim Türkçe, hangisi İngilizce kullanılıyor.",
    href: siteConfig.links.terms,
  },
  {
    icon: Shield,
    title: "CODE_OF_CONDUCT.md",
    description: "Topluluk davranış kuralları.",
    href: siteConfig.links.codeOfConduct,
  },
];

export function Contribute() {
  return (
    <section id="katki" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Katkı"
          title="Bir bölümü üstlenmek için izin beklemeniz gerekmiyor"
          description="Her bölümün README dosyasında planlanan konular ve durumları listelenir. ⬜ ile işaretli konulardan herhangi birini üstlenebilir, eksik bir açıklamayı düzeltebilir veya örnek kod ekleyebilirsiniz."
        />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <ol className="flex flex-col">
            {steps.map((step, index) => (
              <li
                key={step}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-9 bottom-1 left-[15px] w-px bg-border"
                  />
                ) : null}
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-foreground ring-1 ring-border">
                  {index + 1}
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Başlamadan önce
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {documents.map((doc) => {
                const Icon = doc.icon;

                return (
                  <li key={doc.title} className="group bg-card">
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex h-full flex-col gap-2 p-5 outline-none transition-colors hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" aria-hidden />
                        <span className="font-mono text-xs text-foreground">
                          {doc.title}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {doc.description}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
