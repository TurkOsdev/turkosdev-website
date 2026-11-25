import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
  İki eylem biçimi: birincil eylem nötr açık dolgu (koyu zeminde yüksek kontrast)
  ve ikincil eylem ikincil yüzeyli tuş ya da metin bağlantısı.
*/
const variants = {
  primary:
    "inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brand active:scale-[0.98]",
  secondary:
    "inline-flex h-11 items-center justify-center rounded-lg border border-rule bg-secondary px-5 text-sm font-medium text-foreground transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/20 hover:bg-[#2b2b2e] active:scale-[0.98]",
  quiet:
    "inline-flex items-center gap-2 text-sm text-secondary-text underline decoration-rule underline-offset-4 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground hover:decoration-current",
} as const;

type ActionProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
};

export function Action({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ActionProps) {
  const classes = cn("focus-ring", variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
