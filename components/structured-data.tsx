import { siteConfig } from "@/lib/site";

/**
 * Arama motorlarına organizasyon ve site bilgisini JSON-LD olarak verir.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/turkosdevlogo.png`,
        description: siteConfig.description,
        foundingDate: "2026",
        areaServed: "TR",
        knowsLanguage: ["tr"],
        sameAs: [siteConfig.links.github, siteConfig.links.notes],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "tr-TR",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "EducationalOccupationalProgram",
        name: "Türkçe OSDev Notları",
        description:
          "İşletim sistemi geliştirme, kernel, bellek yönetimi ve düşük seviye programlama üzerine Türkçe açık kaynak not koleksiyonu.",
        url: siteConfig.links.notes,
        provider: { "@id": `${siteConfig.url}/#organization` },
        educationalProgramMode: "online",
        occupationalCategory: "Systems Programming",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify çıktısı sabit veriden üretiliyor, kullanıcı girdisi yok.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
