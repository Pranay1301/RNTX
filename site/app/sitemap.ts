import type { MetadataRoute } from "next";
import { divisions, playerDossiers } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://revenant-xspark.pranay-ai.chatgpt.site";
  const staticRoutes = ["", "/teams", "/events", "/achievements", "/story", "/creators", "/shop"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-08-01"), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...divisions.map((division) => ({ url: `${base}/teams/${division.slug}`, lastModified: new Date("2026-08-01"), changeFrequency: "weekly" as const, priority: 0.75 })),
    ...playerDossiers.map((player) => ({ url: `${base}/players/${player.slug}`, lastModified: new Date("2026-08-01"), changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
