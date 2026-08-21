import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Türkçe OSDev kaynakları`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "turkosdevlogo.png"));
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
          background: "#080808",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 240,
            width: 720,
            height: 520,
            background:
              "radial-gradient(circle at center, rgba(227,10,23,0.55), rgba(227,10,23,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={124} height={124} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#b5b5b5",
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            Türkçe OSDev bilgi tabanı
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.05,
              color: "#fafafa",
              fontWeight: 700,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            İşletim sistemi geliştirmeyi Türkçe öğren
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1a1",
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            Bootloader, kernel, bellek yönetimi ve sürücüler üzerine açık kaynak
            Türkçe notlar.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262626",
            paddingTop: 28,
            fontSize: 24,
            color: "#8f8f8f",
          }}
        >
          <div style={{ display: "flex" }}>github.com/TurkOsdev</div>
          <div style={{ display: "flex", color: "#e30a17" }}>osdev-notlari</div>
        </div>
      </div>
    ),
    size
  );
}
