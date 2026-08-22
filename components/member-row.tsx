import Image from "next/image";

import type { Member } from "@/lib/github";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function MemberRow({ member }: { member: Member }) {
  const meta = [
    member.contributions > 0 ? `${member.contributions} commit` : null,
    member.location,
  ].filter(Boolean);

  return (
    <li className="border-t border-rule last:border-b">
      <article className="group grid grid-cols-1 gap-x-8 gap-y-5 py-8 md:grid-cols-12 md:py-10">
        <div className="flex items-center gap-5 md:col-span-4">
          <Image
            src={member.avatarUrl}
            alt=""
            width={72}
            height={72}
            className="size-14 shrink-0 rounded-xs object-cover grayscale transition-[filter] duration-500 md:size-16 group-hover:grayscale-0"
          />
          <div className="min-w-0">
            <h3 className="display truncate text-display-2xs">
              {member.name}
            </h3>
            <a
              href={member.htmlUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              @{member.login}
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:pt-1">
          {member.bio ? (
            <p className="text-body text-muted-foreground">
              {member.bio}
            </p>
          ) : null}
          {meta.length > 0 ? (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {meta.join(" · ")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-start gap-x-6 gap-y-2 md:col-span-3 md:justify-end md:pt-1">
          <a
            href={member.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
          >
            GitHub
          </a>
          {member.blog ? (
            <a
              href={member.blog}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring text-sm text-muted-foreground underline decoration-rule underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
            >
              {hostOf(member.blog)}
            </a>
          ) : null}
        </div>
      </article>
    </li>
  );
}
