"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active =
    mainNav.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )?.href ?? null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-rule bg-background"
          : "border-b border-transparent bg-background"
      )}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between px-6 md:px-8">
        <Link href="/" className="focus-ring relative z-10 shrink-0 rounded-sm">
          <Image
            src="/turkosdev-wordmark.png"
            alt=""
            width={495}
            height={118}
            className="h-5 w-auto transition-opacity duration-150 hover:opacity-80"
            priority
          />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>

        <nav
          aria-label="Ana menü"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {mainNav.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-ring relative inline-flex h-9 items-center rounded-lg px-3.5 text-sm transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-secondary-text hover:bg-card hover:text-foreground"
                )}
              >
                {item.label}
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 bottom-1 h-px bg-brand"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-ring relative z-10 hidden h-9 items-center gap-2 rounded-lg px-3 text-sm text-secondary-text transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-card hover:text-foreground md:inline-flex"
        >
          <GithubIcon className="size-4 text-muted-foreground" aria-hidden />
          <span>GitHub</span>
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="focus-ring -mr-2 flex size-10 items-center justify-center rounded-lg text-foreground transition-colors duration-150 hover:bg-card md:hidden"
            >
              <Menu className="size-[18px]" strokeWidth={1.5} aria-hidden />
              <span className="sr-only">Menüyü aç</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-l border-rule bg-background data-[side=right]:w-full data-[side=right]:sm:max-w-sm"
          >
            <SheetTitle className="sr-only">Menü</SheetTitle>
            <nav aria-label="Mobil menü" className="mt-16 flex flex-col px-6">
              {mainNav.map((item) => {
                const isActive = active === item.href;
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "focus-ring flex items-center justify-between border-t border-rule py-4 text-lg font-medium transition-colors duration-150",
                        isActive ? "text-foreground" : "text-secondary-text hover:text-foreground"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                      ) : null}
                    </Link>
                  </SheetClose>
                );
              })}
              <SheetClose asChild>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-ring flex items-center gap-2.5 border-t border-b border-rule py-4 text-lg font-medium text-secondary-text transition-colors duration-150 hover:text-foreground"
                >
                  <GithubIcon className="size-4 text-muted-foreground" aria-hidden />
                  <span>GitHub</span>
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
