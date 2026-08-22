import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-24 pb-40 md:px-10 md:pt-40">
      <p className="label">404</p>
      <h1 className="display mt-6 max-w-[14ch] text-[clamp(1.75rem,4vw,3rem)]">
        Bu adreste bir sayfa yok
      </h1>
      <p className="measure mt-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
        Aradığınız içerik taşınmış veya hiç var olmamış olabilir.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/"
          className="rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Ana sayfa
        </Link>
        <Link
          href="/konular"
          className="text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
        >
          Konular
        </Link>
      </div>
    </div>
  );
}
