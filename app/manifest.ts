import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#131313",
    theme_color: "#131313",
    lang: "tr",
    dir: "ltr",
    categories: ["education", "developer", "productivity"],
    icons: [
      {
        src: "/turkosdevlogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
