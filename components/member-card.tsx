import Image from "next/image";
import { GitCommitHorizontal, Link2, MapPin, Users } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Member } from "@/lib/github";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div aria-hidden className="brand-glow absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-40" />

      <div className="relative flex items-start gap-4">
        <Image
          src={member.avatarUrl}
          alt=""
          width={64}
          height={64}
          className="size-16 shrink-0 rounded-full ring-1 ring-border"
        />
        <div className="flex min-w-0 flex-col gap-0.5 pt-1">
          <h3 className="font-heading truncate text-base font-medium">
            {member.name}
          </h3>
          <a
            href={member.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="truncate font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            @{member.login}
          </a>
        </div>
      </div>

      {member.bio ? (
        <p className="relative text-sm leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      ) : null}

      <dl className="relative flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {member.contributions > 0 ? (
          <div className="flex items-center gap-1.5">
            <GitCommitHorizontal className="size-3.5" aria-hidden />
            <dt className="sr-only">Notlar deposundaki commit sayısı</dt>
            <dd>
              <span className="text-foreground">{member.contributions}</span> commit
            </dd>
          </div>
        ) : null}

        {member.followers > 0 ? (
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden />
            <dt className="sr-only">Takipçi</dt>
            <dd>
              <span className="text-foreground">{member.followers}</span> takipçi
            </dd>
          </div>
        ) : null}

        {member.location ? (
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            <dt className="sr-only">Konum</dt>
            <dd>{member.location}</dd>
          </div>
        ) : null}
      </dl>

      <div className="relative mt-auto flex flex-wrap gap-2 pt-1">
        <Button asChild size="sm" variant="outline">
          <a href={member.htmlUrl} target="_blank" rel="noreferrer noopener">
            <GithubIcon aria-hidden />
            Profil
          </a>
        </Button>
        {member.blog ? (
          <Button asChild size="sm" variant="ghost">
            <a href={member.blog} target="_blank" rel="noreferrer noopener">
              <Link2 aria-hidden />
              {hostOf(member.blog)}
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  );
}
