import { siteConfig } from "@/lib/site";

const API = "https://api.github.com";
const NOTES_REPO = "osdev-notlari";

/** Üye listesi saatte bir tazelenir; GitHub API'sinin kotası için yeterince seyrek. */
const REVALIDATE_SECONDS = 3600;

export type Member = {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  publicRepos: number;
  /** osdev-notlari deposundaki commit sayısı. */
  contributions: number;
};

type ApiMember = {
  login: string;
  avatar_url: string;
  html_url: string;
};

type ApiUser = ApiMember & {
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  public_repos: number;
};

type ApiContributor = ApiMember & {
  contributions: number;
  type: string;
};

function headers(): HeadersInit {
  const base: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Kota yetmezse repo ayarlarından bir token verilebilir; zorunlu değildir.
  if (process.env.GITHUB_TOKEN) {
    base.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return base;
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Ağ hatası veya kota aşımı sayfanın çökmesine yol açmamalı.
    return null;
  }
}

/**
 * Organizasyonun herkese açık üyelerini, profil detaylarıyla ve notlar
 * deposundaki katkı sayılarıyla birlikte döndürür.
 */
export async function getOrgMembers(): Promise<Member[]> {
  const org = siteConfig.org;

  const [members, contributors] = await Promise.all([
    getJson<ApiMember[]>(`/orgs/${org}/members?per_page=100`),
    getJson<ApiContributor[]>(`/repos/${org}/${NOTES_REPO}/contributors?per_page=100`),
  ]);

  const contributionsByLogin = new Map<string, number>(
    (contributors ?? [])
      .filter((entry) => entry.type !== "Bot")
      .map((entry) => [entry.login.toLowerCase(), entry.contributions])
  );

  // Üye listesi alınamazsa katkı verenler üzerinden bir liste kurmayı dene.
  const base: ApiMember[] =
    members ?? (contributors ?? []).filter((entry) => entry.type !== "Bot");

  const profiles = await Promise.all(
    base.map(async (member) => {
      const user = await getJson<ApiUser>(`/users/${member.login}`);

      return {
        login: member.login,
        name: user?.name ?? member.login,
        avatarUrl: member.avatar_url.split("?")[0],
        htmlUrl: member.html_url,
        bio: user?.bio ?? null,
        location: user?.location ?? null,
        blog: user?.blog ? normalizeUrl(user.blog) : null,
        company: user?.company ?? null,
        followers: user?.followers ?? 0,
        publicRepos: user?.public_repos ?? 0,
        contributions: contributionsByLogin.get(member.login.toLowerCase()) ?? 0,
      } satisfies Member;
    })
  );

  return profiles.sort((a, b) => {
    if (b.contributions !== a.contributions) {
      return b.contributions - a.contributions;
    }
    return a.login.localeCompare(b.login, "tr");
  });
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
