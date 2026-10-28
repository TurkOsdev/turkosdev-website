# turkosdev-website

[Türk OSDev Topluluğu](https://github.com/TurkOsdev)'nun tanıtım sitesi. Topluluğun
amacını, [osdev-notlari](https://github.com/TurkOsdev/osdev-notlari) deposundaki
bölümleri ve ekibi tanıtır.

## Teknolojiler

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (radix-nova)
- [React Bits](https://reactbits.dev) — Gradient Waves, Split Text, Animated
  Content, Count Up, Shiny Text
- [GSAP](https://gsap.com) ve [Motion](https://motion.dev) — animasyonlar
- [ogl](https://github.com/oframe/ogl) — WebGL

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
  page.tsx              ana sayfa (hero, sayaçlar, topluluk, cta)
  konular/page.tsx      not arşivi indeksi
  blog/                 blog listesi, yazı sayfaları, RSS (/blog/rss.xml)
  katki/page.tsx        katkı rehberi
  ekip/page.tsx         ekip listesi (/team buraya yönlendirilir)
  opengraph-image.tsx   dinamik OG görseli
  sitemap.ts robots.ts manifest.ts
components/
  sections/             sayfa bölümleri
  reactbits/            reactbits.dev'den olduğu gibi alınan bileşenler
  ui/                   shadcn/ui bileşenleri
  gradient-waves.tsx    WebGL dalga alanı (React Bits)
lib/
  site.ts               site sabitleri ve navigasyon
  topics.ts             notlar deposunun bölüm listesi
  blog.ts               public/blogs altındaki markdown yazılarını okur
public/
  blogs/                blog yazıları (*.md)
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

## Blog

`public/blogs/` altındaki her `.md` dosyası (alt klasörler dahil) otomatik olarak
bir blog yazısı olur. Adres dosya adından gelir: `public/blogs/ilk-yazi.md` →
`/blog/ilk-yazi`. Alt klasörler sadece düzen içindir, dosya adları benzersiz olmalı.

Dosya `+++` ile sınırlanmış bir TOML başlığıyla başlar:

```toml
+++
baslik = "İşletim Sistemi Nasıl Yazılır?"
aciklama = "Arama sonuçlarında görünen özet, en fazla ~155 karakter."
yazar = "Tuna Kılıç <tuna@tunakilic.com>"   # birden fazla yazar için dizi
tarih = 2026-10-28
guncelleme = 2026-11-02                      # opsiyonel
etiketler = ["osdev", "kernel"]              # opsiyonel
taslak = true                                # opsiyonel, sadece `next dev`'de görünür
+++
```

Sayfa başlığı `baslik` alanından gelir, bu yüzden gövde `##` ile başlamalı.
Zorunlu alanlardan biri eksik olursa build dosya adını belirten bir hatayla durur.

## Lisans

[MIT](LICENSE)
