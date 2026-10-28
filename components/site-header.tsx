"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { GithubIcon } from "@/components/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Göstergenin durduğu sekme: fare üzerindeyken o, değilse açık sayfa.
  const active =
    mainNav.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )?.href ?? null;
  const marker = hovered ?? active;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-rule bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="relative mx-auto flex h-[70px] w-full max-w-[76rem] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="focus-ring relative z-10 shrink-0"
        >
          <Image
            src="/turkosdev-wordmark.png"
            alt=""
            width={495}
            height={118}
            className="h-5 w-auto transition-opacity hover:opacity-80"
            priority
          />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>

        <nav
          aria-label="Ana menü"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "page" : undefined}
              onMouseEnter={() => setHovered(item.href)}
              className={cn(
                "focus-ring relative px-4 py-2 text-[0.9375rem] transition-colors",
                active === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground focus-visible:text-foreground"
              )}
            >
              <AnimatePresence>
                {marker === item.href ? (
                  <motion.span
                    layoutId="nav-marker"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </AnimatePresence>
              {/* Açık sayfa, hover göstergesinden ayrışsın diye kırmızı çizgi alır. */}
              {active === item.href ? (
                <span
                  aria-hidden
                  className="absolute inset-x-4 -bottom-px h-px bg-primary"
                />
              ) : null}
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-ring relative z-10 hidden items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          <GithubIcon className="size-4" aria-hidden />
          GitHub
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="focus-ring -mr-2 flex size-10 items-center justify-center text-foreground md:hidden"
            >
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
              <span className="sr-only">Menüyü aç</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-l-0 bg-background data-[side=right]:w-full data-[side=right]:sm:max-w-full"
          >
            <SheetTitle className="sr-only">Menü</SheetTitle>
            <nav aria-label="Mobil menü" className="mt-20 flex flex-col px-6">
              {mainNav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="focus-ring display border-t border-rule py-6 text-2xl text-foreground"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-ring display border-t border-b border-rule py-6 text-2xl text-muted-foreground"
                >
                  GitHub
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
