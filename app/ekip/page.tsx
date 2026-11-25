import type { Metadata } from "next";

import { Action } from "@/components/action";
import { MemberRow } from "@/components/member-row";
import { SectionHead } from "@/components/section-head";
import { getOrgMembers } from "@/lib/github";
import { siteConfig } from "@/lib/site";

const title = "Ekip";
const description =
  "Türk OSDev Topluluğu'nu kuran ve notlara katkı veren geliştiriciler. Liste GitHub organizasyonundan alınır.";

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
};

/** Üye listesi GitHub'dan geldiği için sayfa saatte bir yeniden üretilir. */
export const revalidate = 3600;

export default async function TeamPage() {
  const members = await getOrgMembers();

  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-16 pb-24 md:px-8 md:pt-24 md:pb-32">
      <SectionHead
        label="Ekip"
        title="Topluluğu kuranlar"
        note="Liste GitHub organizasyonundan otomatik oluşur, katkı sayısına göre sıralanır"
      />

      {members.length > 0 ? (
        <ul className="mt-12 md:mt-16">
          {members.map((member) => (
            <MemberRow key={member.login} member={member} />
          ))}
        </ul>
      ) : (
        <p className="mt-12 border-t border-rule pt-8 text-sm text-secondary-text md:mt-16">
          Üye listesi şu anda alınamadı.{" "}
          <a
            href={`${siteConfig.links.github}/people`}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring text-foreground underline decoration-rule underline-offset-4 hover:decoration-current"
          >
            Organizasyon sayfasına
          </a>{" "}
          bakabilirsin.
        </p>
      )}

      <div className="mt-20 grid gap-y-6 border-t border-rule pt-12 md:mt-28 md:grid-cols-12 md:gap-x-12">
        <h2 className="display text-display-xs md:col-span-5">
          Sen de katıl
        </h2>
        <div className="md:col-span-6 md:col-start-7">
          <p className="measure text-body text-secondary-text">
            Tek şart katkı vermek. Pull request&apos;in birleştirildikten sonra
            organizasyona davet edilirsin.
          </p>
          <Action
            href={siteConfig.links.contributing}
            external
            className="mt-6"
          >
            Nasıl katkı verilir
          </Action>
        </div>
      </div>
    </div>
  );
}
