import { BookOpen, Check, Languages, ScrollText } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const principles = [
  {
    icon: ScrollText,
    title: "Tanım değil, mekanizma",
    description:
      "Her not; kavramın neden gerekli olduğunu, donanım seviyesinde nasıl çalıştığını ve kernel tarafından nasıl kullanıldığını birlikte anlatır.",
  },
  {
    icon: BookOpen,
    title: "Birincil kaynak",
    description:
      "Bilgiler; CPU üreticilerinin architecture manual'ları, donanım ve protokol spesifikasyonları ile resmi standartlara dayandırılır.",
  },
  {
    icon: Check,
    title: "Küçük kod örnekleri",
    description:
      "Örnekler kavramı göstermeye yetecek kadar küçük tutulur. Mimariler arası davranış farkları ayrıca belirtilir.",
  },
  {
    icon: Languages,
    title: "Tutarlı terminoloji",
    description:
      "İngilizce teknik terimler, aramalarda ve resmi dokümantasyonda karşılığı bulunabilsin diye gerektiğinde korunur.",
  },
];

const anatomy = [
  { step: "01", label: "Kavram neden var?" },
  { step: "02", label: "Donanımda nasıl çalışır?" },
  { step: "03", label: "Kernel bunu nasıl kullanır?" },
  { step: "04", label: "Gerçek bir implementasyon" },
  { step: "05", label: "Kullanılan kaynaklar" },
];

export function Approach() {
  return (
    <section id="yaklasim" className="relative scroll-mt-20 py-24 sm:py-32">
      <div aria-hidden className="brand-glow absolute inset-x-0 top-0 h-64 opacity-40" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Yaklaşım"
            title="Ezberletmeyen, gerekçesini anlatan notlar"
            description="Buradaki notlar yalnızca kavramların tanımlarını vermeyi amaçlamaz; bir konunun neden o şekilde çözüldüğünü de açıklar."
          />

          <ul className="mt-10 flex flex-col gap-7">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <li key={principle.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground ring-1 ring-border">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading text-sm font-medium">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader className="border-b">
            <CardTitle className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Bir notun anatomisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col">
              {anatomy.map((item, index) => (
                <li
                  key={item.step}
                  className="flex items-center gap-4 border-b border-border py-4 last:border-0"
                >
                  <span className="font-mono text-xs text-primary">{item.step}</span>
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span
                    aria-hidden
                    className="ml-auto font-mono text-xs text-muted-foreground/50"
                  >
                    {index === anatomy.length - 1 ? "└" : "├"}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
