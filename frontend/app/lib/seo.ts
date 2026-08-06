// lib/seo.ts

import type { Metadata } from "next";
import type { SeoComponent, SiteConfig } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { hasText } from "@/app/lib/validate";

/**
 * Combina el SEO específico de una página (ej. homeSeo) con el SEO
 * por defecto del sitio (siteConfig.defaultSeo) como fallback campo a campo.
 */
export function buildMetadata(
  pageSeo: SeoComponent | undefined,
  siteConfig: SiteConfig
): Metadata {
  const defaultSeo = siteConfig.defaultSeo;

  const title =
    (hasText(pageSeo?.metaTitle) && pageSeo!.metaTitle) ||
    (hasText(defaultSeo?.metaTitle) && defaultSeo!.metaTitle) ||
    siteConfig.siteName;

  const description =
    (hasText(pageSeo?.metaDescription) && pageSeo!.metaDescription) ||
    (hasText(defaultSeo?.metaDescription) && defaultSeo!.metaDescription) ||
    undefined;

  const keywords =
    (hasText(pageSeo?.keywords) && pageSeo!.keywords) ||
    (hasText(defaultSeo?.keywords) && defaultSeo!.keywords) ||
    undefined;

  const canonicalURL =
    (hasText(pageSeo?.canonicalURL) && pageSeo!.canonicalURL) ||
    (hasText(defaultSeo?.canonicalURL) && defaultSeo!.canonicalURL) ||
    undefined;

  const robotsText =
    (hasText(pageSeo?.metaRobots) && pageSeo!.metaRobots) ||
    (hasText(defaultSeo?.metaRobots) && defaultSeo!.metaRobots) ||
    "index, follow";

  const image = pageSeo?.metaImage ?? defaultSeo?.metaImage;
  const imageUrl = image ? getStrapiMedia(image) : null;

  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: canonicalURL ? { canonical: canonicalURL } : undefined,
    robots: parseRobots(robotsText),
    openGraph: {
      title,
      description,
      siteName: siteConfig.siteName,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      locale: "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

/** Convierte "index, follow" (texto libre de Strapi) al objeto que espera Next.js. */
function parseRobots(text: string): Metadata["robots"] {
  const normalized = text.toLowerCase();
  return {
    index: normalized.includes("noindex") ? false : true,
    follow: normalized.includes("nofollow") ? false : true,
  };
}