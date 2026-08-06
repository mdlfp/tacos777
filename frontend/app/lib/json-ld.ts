// lib/json-ld.ts

import type { SiteConfig, Sucursal } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { getValidSucursales, hasText } from "@/app/lib/validate";

interface BuildJsonLdParams {
  siteConfig: SiteConfig;
  sucursales?: Sucursal[];
  siteUrl: string;
}

export function buildRestaurantJsonLd({
  siteConfig,
  sucursales,
  siteUrl,
}: BuildJsonLdParams) {
  const logoUrl = getStrapiMedia(siteConfig.logo);
  const validSucursales = getValidSucursales(sucursales);

  const sameAs = (siteConfig.redesSociales ?? [])
    .filter((r) => hasText(r.url))
    .map((r) => r.url);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.siteName,
    url: siteUrl,
    logo: logoUrl ?? undefined,
    image: logoUrl ?? undefined,
    telephone: hasText(siteConfig.telefono) ? siteConfig.telefono : undefined,
    email: hasText(siteConfig.email) ? siteConfig.email : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    servesCuisine: "Mexican",
    priceRange: "$$",
    location: validSucursales.map((s) => ({
      "@type": "Place",
      name: s.nombre,
      address: {
        "@type": "PostalAddress",
        streetAddress: s.direccion,
        addressLocality: "Ensenada",
        addressRegion: "Baja California",
        addressCountry: "MX",
      },
      telephone: hasText(s.telefono) ? s.telefono : undefined,
    })),
  };
}