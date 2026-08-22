import type { Metadata } from "next";
import { Action } from "@/components/action";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[76rem] px-6 pt-24 pb-40 md:px-10 md:pt-40">
      <p className="label text-muted-foreground">404</p>
      <h1 className="display mt-6 max-w-[14ch] text-display-md">
        Bu adreste bir sayfa yok
      </h1>
      <p className="measure mt-8 text-lead text-muted-foreground">
        Aradığınız içerik taşınmış veya hiç var olmamış olabilir.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Action href="/">Ana sayfa</Action>
        <Action href="/konular" variant="quiet">
          Konular
        </Action>
      </div>
    </div>
  );
}
