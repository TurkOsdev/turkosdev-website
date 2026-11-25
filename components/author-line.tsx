import type { Author } from "@/lib/blog";

/**
 * Yazarı TOML başlığındaki biçimiyle gösterir: `Ad Soyad <eposta>`.
 * E-posta varsa tıklanınca posta istemcisini açar.
 */
export function AuthorLine({ author }: { author: Author }) {
  return (
    <span>
      <span className="text-foreground">{author.name}</span>
      {author.email ? (
        <>
          {" "}
          <a
            href={`mailto:${author.email}`}
            className="focus-ring text-muted-foreground transition-colors duration-150 hover:text-brand"
          >
            &lt;{author.email}&gt;
          </a>
        </>
      ) : null}
    </span>
  );
}
