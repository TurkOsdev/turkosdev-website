import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-5 py-24">
      <div aria-hidden className="grid-backdrop absolute inset-0" />

      <div className="relative flex max-w-md flex-col items-center gap-5 text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
          404
        </span>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Bu adreste bir sayfa yok
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          Aradığınız içerik taşınmış veya hiç var olmamış olabilir. Ana sayfadan
          devam edebilir ya da notlara göz atabilirsiniz.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Ana sayfa</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#konular">Konular</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
