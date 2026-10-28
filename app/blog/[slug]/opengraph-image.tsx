import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const alt = `Blog yazısı · ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const logo = await readFile(
    join(process.cwd(), "public", "turkosdev-wordmark.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#131313",
          padding: "68px 76px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={logoSrc} width={168} height={40} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 3,
              color: "#d42a2a",
            }}
          >
            BLOG
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.08,
            color: "#f4f4f4",
            letterSpacing: -2.5,
            maxWidth: 980,
          }}
        >
          {post?.title ?? siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #292929",
            paddingTop: 26,
            fontSize: 22,
            color: "#8a8a8a",
          }}
        >
          <div style={{ display: "flex" }}>
            {post
              ? `${post.authors.map((author) => author.name).join(", ")} · ${formatDate(post.date)}`
              : ""}
          </div>
          <div style={{ display: "flex" }}>
            {`${new URL(siteConfig.url).host}/blog`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
