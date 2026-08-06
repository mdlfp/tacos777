// lib/strapi.tsx

import qs from "qs";
import type { HomePage, SiteConfig, StrapiMedia } from "@/app/lib/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error(
    "Falta la variable de entorno NEXT_PUBLIC_STRAPI_URL"
  );
}

async function fetchAPI<T>(
  path: string,
  query: string = "",
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Error al consultar Strapi: ${res.status} ${res.statusText} (${url})`
    );
  }

  const json = await res.json();
  return json.data as T;
}

/* -------------------------------------------------------------------------- */
/* Home Page                                                                  */
/* -------------------------------------------------------------------------- */

const homePageQuery = qs.stringify(
  {
    populate: {
      sections: {
        on: {
          "layout.hero-section": {
            populate: ["image", "ctaLink"],
          },
          "layout.nosotros-section": {
            populate: ["image", "timeline"],
          },
          "layout.menu-section": {
            populate: {
              products: {
                populate: ["image", "product_category"],
              },
            },
          },
          "layout.sucursales-section": {
            populate: {
              sucursal: {
                populate: ["image", "horario", "mapLink"],
              },
            },
          },
          "layout.contacto-section": {
            populate: "*",
          },
        },
      },
      homeSeo: { populate: "*" },
    },
  },
  { encodeValuesOnly: true }
);

export async function getHomePage(): Promise<HomePage> {
  return fetchAPI<HomePage>("/home-page", homePageQuery);
}

/* -------------------------------------------------------------------------- */
/* Site Config                                                                */
/* -------------------------------------------------------------------------- */

const siteConfigQuery = qs.stringify(
  {
    populate: {
      logo: { populate: "*" },
      favicon: { populate: "*" },
      redesSociales: { populate: "*" },
      defaultSeo: { populate: "*" },
    },
  },
  { encodeValuesOnly: true }
);

export async function getSiteConfig(): Promise<SiteConfig> {
  return fetchAPI<SiteConfig>("/site-config", siteConfigQuery);
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export function getStrapiMedia(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}