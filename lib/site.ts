/**
 * Site geneli sabitler. Hem arayüz hem de metadata/sitemap tarafından kullanılır.
 * Yayın adresi `NEXT_PUBLIC_SITE_URL` ile geçersiz kılınabilir.
 */
export const siteConfig = {
  name: "Türk OSDev Topluluğu",
  shortName: "TürkOSDev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://turkosdev.org",
  locale: "tr_TR",
  description:
    "Türkçe işletim sistemi geliştirme topluluğu. Kernel, bootloader, bellek yönetimi ve düşük seviye programlama üzerine açık kaynak notlar ve kaynaklar.",
  tagline: "Türkçe OSDev bilgi tabanı",
  keywords: [
    "osdev",
    "işletim sistemi geliştirme",
    "kernel geliştirme",
    "türkçe osdev",
    "bootloader",
    "x86",
    "x86-64",
    "riscv",
    "arm64",
    "assembly",
    "düşük seviye programlama",
    "sistem programlama",
    "paging",
    "bellek yönetimi",
    "türk osdev topluluğu",
  ],
  links: {
    github: "https://github.com/TurkOsdev",
    notes: "https://github.com/TurkOsdev/osdev-notlari",
    contributing:
      "https://github.com/TurkOsdev/osdev-notlari/blob/main/CONTRIBUTING.md",
    codeOfConduct:
      "https://github.com/TurkOsdev/osdev-notlari/blob/main/CODE_OF_CONDUCT.md",
    issues: "https://github.com/TurkOsdev/osdev-notlari/issues",
    website: "https://github.com/TurkOsdev/turkosdev-website",
  },
  org: "TurkOsdev",
} as const;

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const mainNav: NavItem[] = [
  { href: "/#konular", label: "Konular" },
  { href: "/#yaklasim", label: "Yaklaşım" },
  { href: "/ekip", label: "Ekip" },
  { href: "/#katki", label: "Katkı" },
];
