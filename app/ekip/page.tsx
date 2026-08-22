import type { Metadata } from "next";

import { MemberRow } from "@/components/member-row";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
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
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-12 pb-28 md:px-10 md:pt-20 md:pb-36">
      <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-7">
          <p className="label">Ekip</p>
          <h1 className="display mt-6 text-display-md">
            Topluluğu kuranlar
          </h1>
        </div>
        <p className="measure-sm text-body text-muted-foreground md:col-span-4 md:col-start-9 md:pb-3">
          Liste GitHub organizasyonundan otomatik oluşur, katkı sayısına göre
          sıralanır.
        </p>
      </div>

      {members.length > 0 ? (
        <ul className="mt-14 md:mt-20">
          {members.map((member, index) => (
            <AnimatedContent
              key={member.login}
              distance={26}
              duration={0.55}
              delay={Math.min(index, 5) * 0.06}
              threshold={0.1}
            >
              <MemberRow member={member} />
            </AnimatedContent>
          ))}
        </ul>
      ) : (
        <p className="mt-14 border-t border-rule pt-8 text-sm text-muted-foreground md:mt-20">
          Üye listesi şu anda alınamadı.{" "}
          <a
            href={`${siteConfig.links.github}/people`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground underline decoration-rule underline-offset-4 hover:decoration-current"
          >
            Organizasyon sayfasına
          </a>{" "}
          bakabilirsiniz.
        </p>
      )}

      <div className="mt-24 grid gap-y-6 border-t border-rule pt-14 md:mt-32 md:grid-cols-12 md:gap-x-16">
        <h2 className="display text-display-xs md:col-span-5">
          Sen de katıl
        </h2>
        <div className="md:col-span-6 md:col-start-7 md:pt-2">
          <p className="measure text-body text-muted-foreground">
            Tek şart katkı vermek. Pull request&apos;in birleştirildikten sonra
            organizasyona davet edilirsin.
          </p>
          <a
            href={siteConfig.links.contributing}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-block rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Nasıl katkı verilir
          </a>
        </div>
      </div>
    </div>
  );
}
