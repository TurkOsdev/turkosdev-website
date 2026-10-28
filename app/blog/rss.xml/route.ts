import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}${post.href}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.authors.map((author) => `      <dc:creator>${escape(author.name)}</dc:creator>`).join("\n")}
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(`Blog · ${siteConfig.name}`)}</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escape(siteConfig.description)}</description>
    <language>tr</language>
    <atom:link href="${siteConfig.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].updated ?? posts[0].date).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
