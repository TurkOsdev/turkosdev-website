import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
  Sitedeki iki eylem biçimi: birincil eylem dolu bir tuş, ikincil eylem altı
  çizili sessiz bir bağlantı. Her sayfa aynı ikiliyi kullanır.
*/
const variants = {
  primary:
    "inline-block rounded-xs bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground",
  quiet:
    "text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current",
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
