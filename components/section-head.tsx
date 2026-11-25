import type { ReactNode } from "react";

/*
  İç sayfaların ortak başlığı: solda etiket ve başlık, sağda tek cümlelik not.
*/
type SectionHeadProps = {
  label: string;
  title: ReactNode;
  note?: ReactNode;
};

export function SectionHead({ label, title, note }: SectionHeadProps) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
      <div className="md:col-span-7">
        <p className="label text-muted-foreground">{label}</p>
        <h1 className="display mt-4 text-display-md">{title}</h1>
      </div>
      {note ? (
        <p className="measure-sm text-body text-secondary-text md:col-span-4 md:col-start-9 md:pb-1">
          {note}
        </p>
      ) : null}
    </div>
  );
}
