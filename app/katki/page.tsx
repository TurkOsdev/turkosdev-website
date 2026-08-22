import type { Metadata } from "next";

import { Contribute } from "@/components/sections/contribute";
import { siteConfig } from "@/lib/site";

const title = "Katkı";
const description =
  "Türk OSDev Topluluğu'na nasıl katkı verilir: boş bir konuyu üstlenme, içerik standartları ve pull request süreci.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/katki" },
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/katki`,
  },
};

export default function ContributePage() {
  return <Contribute />;
}
