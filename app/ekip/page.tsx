import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { MemberCard } from "@/components/member-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getOrgMembers } from "@/lib/github";
import { siteConfig } from "@/lib/site";

const title = "Ekip";
const description =
  "Türk OSDev Topluluğu'nu kuran ve osdev-notlari deposuna katkı veren geliştiriciler. Liste doğrudan GitHub organizasyonundan alınır.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ekip" },
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/ekip`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${siteConfig.name}`,
    description,
  },
};

/** Üye listesi GitHub'dan geldiği için sayfa saatte bir yeniden üretilir. */
export const revalidate = 3600;

export default async function TeamPage() {
  const members = await getOrgMembers();

  return (
    <div className="relative">
      <div aria-hidden className="grid-backdrop absolute inset-x-0 top-0 h-96" />
      <div aria-hidden className="brand-glow absolute inset-x-0 top-0 h-80 opacity-50" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Ekip"
          title="Topluluğu birlikte kuranlar"
          description="Aşağıdaki liste, GitHub organizasyonunun herkese açık üyelerinden otomatik olarak oluşturulur ve osdev-notlari deposundaki katkı sayısına göre sıralanır."
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild size="sm" variant="outline">
            <a
              href={`${siteConfig.links.github}/people`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon aria-hidden />
              GitHub&apos;daki üyeler
              <ArrowUpRight aria-hidden data-icon="inline-end" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Organizasyona katıldıktan sonra üyeliğinizi herkese açık yaparsanız
            burada listelenirsiniz.
          </p>
        </div>

        {members.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <MemberCard key={member.login} member={member} />
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Üye listesi şu anda GitHub&apos;dan alınamadı. Güncel listeyi{" "}
              <a
                href={`${siteConfig.links.github}/people`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary underline underline-offset-4"
              >
                organizasyon sayfasından
              </a>{" "}
              görebilirsiniz.
            </p>
          </div>
        )}

        <section className="mt-20 rounded-2xl border border-border bg-card p-8 sm:p-12">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Ekibe katılmak ister misiniz?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Topluluk üyeliği için tek şart katkı vermek. Bir bölümdeki eksik
            konuyu üstlenin, pull request&apos;iniz birleştirildikten sonra
            organizasyona davet edilirsiniz.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a
                href={siteConfig.links.contributing}
                target="_blank"
                rel="noreferrer noopener"
              >
                Katkı rehberi
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={siteConfig.links.issues}
                target="_blank"
                rel="noreferrer noopener"
              >
                Açık issue&apos;lar
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
