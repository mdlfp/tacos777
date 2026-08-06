import type { MetadataRoute } from "next";
import { getHomePage } from "@/app/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://taqueria777.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homePage = await getHomePage();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(homePage.updatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}