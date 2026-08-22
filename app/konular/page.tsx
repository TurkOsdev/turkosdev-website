import type { Metadata } from "next";

import { Topics } from "@/components/sections/topics";
import { siteConfig } from "@/lib/site";

const title = "Konular";
const description =
  "Bootloader, kernel, bellek yönetimi, sürücüler, dosya sistemleri ve ağ üzerine 13 bölümlük Türkçe OSDev not arşivi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/konular" },
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/konular`,
  },
};

export default function TopicsPage() {
  return <Topics />;
}
