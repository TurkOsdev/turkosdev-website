# turkosdev-website

[Türk OSDev Topluluğu](https://github.com/TurkOsdev)'nun tanıtım sitesi. Topluluğun
amacını, [osdev-notlari](https://github.com/TurkOsdev/osdev-notlari) deposundaki
bölümleri ve ekibi tanıtır.

## Teknolojiler

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (radix-nova)
- [ogl](https://github.com/oframe/ogl) — hero bölümündeki WebGL dalga arkaplanı

## Geliştirme

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde çalışır.

```bash
npm run build   # üretim derlemesi
npm run start   # derlenmiş sürümü çalıştırır
npm run lint    # eslint
```

## Yapı

```
app/
  page.tsx              ana sayfa (hero, konular, yaklaşım, katkı, cta)
  ekip/page.tsx         ekip sayfası (/team buraya yönlendirilir)
  opengraph-image.tsx   dinamik OG görseli
  sitemap.ts robots.ts manifest.ts
components/
  sections/             ana sayfa bölümleri
  ui/                   shadcn/ui bileşenleri
  gradient-waves.tsx    WebGL dalga alanı
lib/
  site.ts               site sabitleri ve navigasyon
  topics.ts             notlar deposunun bölüm listesi
  github.ts             GitHub API'sinden üye/katkı verisi
```

## Ortam değişkenleri

Hiçbiri zorunlu değildir.

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yayın adresi. Canonical, OG ve sitemap URL'lerinde kullanılır. Varsayılan: `https://turkosdev.org` |
| `GITHUB_TOKEN` | GitHub API kotasını yükseltmek için opsiyonel token. |

## Ekip sayfası

Ekip listesi build/ISR sırasında GitHub API'sinden çekilir ve saatte bir tazelenir.
Organizasyona katılıp üyeliğini herkese açık yapan herkes otomatik olarak listelenir;
sıralama `osdev-notlari` deposundaki katkı sayısına göre yapılır. API'ye ulaşılamazsa
`lib/github.ts` içindeki çekirdek listeye düşülür.

## Lisans

[MIT](LICENSE)
