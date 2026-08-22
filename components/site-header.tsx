"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { GithubIcon } from "@/components/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-20 w-full max-w-[76rem] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src="/turkosdev-wordmark.png"
            alt=""
            width={495}
            height={118}
            className="h-5 w-auto"
            priority
          />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>

        <nav
          aria-label="Ana menü"
          className="hidden items-center gap-9 md:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground"
          >
            <GithubIcon className="size-4" aria-hidden />
            GitHub
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="-mr-2 flex size-10 items-center justify-center text-foreground md:hidden"
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
            <nav
              aria-label="Mobil menü"
              className="mt-20 flex flex-col px-6"
            >
              {mainNav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="display border-t border-rule py-6 text-4xl text-foreground"
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
                  className="display border-t border-b border-rule py-6 text-4xl text-muted-foreground"
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
