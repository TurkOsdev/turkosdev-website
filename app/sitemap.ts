import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/konular", priority: 0.9 },
    { path: "/katki", priority: 0.8 },
    { path: "/ekip", priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));
}
