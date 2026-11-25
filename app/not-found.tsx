import type { Metadata } from "next";
import { Action } from "@/components/action";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-20 pb-32 md:px-8 md:pt-32">
      <p className="label text-muted-foreground">404</p>
      <h1 className="display mt-4 max-w-[16ch] text-display-md">
        Bu adreste bir sayfa yok
      </h1>
      <p className="measure mt-6 text-lead text-secondary-text">
        Aradığın içerik taşınmış ya da hiç var olmamış olabilir
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Action href="/">Ana sayfa</Action>
        <Action href="/konular" variant="secondary">
          Konular
        </Action>
      </div>
    </div>
  );
}
