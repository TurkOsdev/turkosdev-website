import type { Metadata } from "next";

import { MemberRow } from "@/components/member-row";
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
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-10 pb-28 md:px-10 md:pt-20 md:pb-40">
      <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-7">
          <p className="label">Ekip</p>
          <h1 className="display mt-6 text-[clamp(2.75rem,6vw,5rem)]">
            Topluluğu birlikte
            <br />
            kuranlar
          </h1>
        </div>
        <p className="measure-sm text-[0.9375rem] leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:pb-3">
          Liste, GitHub organizasyonunun herkese açık üyelerinden otomatik
          oluşturulur ve notlar deposundaki katkı sayısına göre sıralanır.
        </p>
      </div>

      {members.length > 0 ? (
        <ul className="mt-16 md:mt-24">
          {members.map((member) => (
            <MemberRow key={member.login} member={member} />
          ))}
        </ul>
      ) : (
        <p className="mt-16 border-t border-rule pt-8 text-sm text-muted-foreground md:mt-24">
          Üye listesi şu anda GitHub&apos;dan alınamadı. Güncel listeyi{" "}
          <a
            href={`${siteConfig.links.github}/people`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground underline decoration-rule underline-offset-4 hover:decoration-current"
          >
            organizasyon sayfasından
          </a>{" "}
          görebilirsiniz.
        </p>
      )}

      <div className="mt-28 grid gap-y-8 md:mt-40 md:grid-cols-12 md:gap-x-16">
        <h2 className="display text-[clamp(1.875rem,3.4vw,2.75rem)] md:col-span-5">
          Ekibe katılmak
          <br />
          ister misiniz?
        </h2>
        <div className="md:col-span-6 md:col-start-7 md:pt-2">
          <p className="measure text-[0.9375rem] leading-relaxed text-muted-foreground">
            Topluluk üyeliği için tek şart katkı vermek. Bir bölümdeki eksik
            konuyu üstlenin; pull request&apos;iniz birleştirildikten sonra
            organizasyona davet edilirsiniz.
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
      </div>
    </div>
  );
}
