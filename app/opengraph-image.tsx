import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Türkçe OSDev kaynakları`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "turkosdev-wordmark.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return (
    new ImageResponse(
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
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={168} height={40} alt="" />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 26,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 78,
                lineHeight: 1.05,
                color: "#f4f4f4",
                letterSpacing: -2.5,
                maxWidth: 880,
              }}
            >
              İşletim sistemi geliştirmeyi Türkçe öğren
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "#9a9a9a",
                maxWidth: 720,
                lineHeight: 1.45,
              }}
            >
              Bootloader, kernel, bellek yönetimi ve sürücüler üzerine açık
              kaynak Türkçe notlar.
            </div>
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
            <div style={{ display: "flex" }}>13 bölüm / 4 mimari / MIT</div>
            <div style={{ display: "flex" }}>github.com/TurkOsdev</div>
          </div>
        </div>
      ),
      size
    )
  );
}
