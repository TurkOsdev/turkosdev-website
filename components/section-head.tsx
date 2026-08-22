import type { ReactNode } from "react";

import AnimatedContent from "@/components/reactbits/AnimatedContent";

/*
  İç sayfaların ortak başlığı: solda etiket ve başlık, sağda tek cümlelik not.
  Üç sayfa da aynı düzeni kullandığı için sayfalar arası geçiş sarsmaz.
*/
type SectionHeadProps = {
  label: string;
  title: ReactNode;
  note?: ReactNode;
};

export function SectionHead({ label, title, note }: SectionHeadProps) {
  return (
    <AnimatedContent distance={24} duration={0.6} threshold={0}>
      <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-7">
          <p className="label text-muted-foreground">{label}</p>
          <h1 className="display mt-6 text-display-md">{title}</h1>
        </div>
        {note ? (
          <p className="measure-sm text-body text-muted-foreground md:col-span-4 md:col-start-9 md:pb-3">
            {note}
          </p>
        ) : null}
      </div>
    </AnimatedContent>
  );
}
