import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/konular", priority: 0.9 },
    { path: "/blog", priority: 0.8 },
    { path: "/katki", priority: 0.8 },
    { path: "/ekip", priority: 0.7 },
  ];

  const posts = await getAllPosts();

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}${post.href}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
