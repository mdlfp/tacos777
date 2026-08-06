// lib/types.ts

/* -------------------------------------------------------------------------- */
/* Tipos base                                                                 */
/* -------------------------------------------------------------------------- */

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

/** Usado en ctaLink (Hero) */
export interface LinkComponent {
  id: number;
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Usado en mapLink (Sucursal) — Strapi usa "href", no "url" */
export interface MapLinkComponent {
  id: number;
  href: string;
  label?: string;
  isExternal?: boolean;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHoursComponent {
  id: number;
  dayOfWeek: DayOfWeek;
  opens?: string;
  closes?: string;
}

export interface TimelineItemComponent {
  id: number;
  title: string; // ej. "Apertura", "Primer local"
  description?: string;
  year?: string;
}

export interface SocialLinkComponent {
  id: number;
  plataforma: string;
  url: string;
}

export interface SeoComponent {
  metaTitle?: string;
  metaDescription?: string;
  metaRobots?: string;
  keywords?: string;
  canonicalURL?: string;
  metaImage?: StrapiMedia;
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export interface HeroSection {
  __component: "layout.hero-section";
  id: number;
  eyebrow?: string;
  heading?: string;
  headingHighlight?: string;
  subHeading?: string;
  image?: StrapiMedia;
  ctaLink?: LinkComponent[];
}

/* -------------------------------------------------------------------------- */
/* Producto (Collection Type, no embebido en la sección)                      */
/* -------------------------------------------------------------------------- */

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name?: string;
  description?: string;
  basePrice?: number;
  product_category?: ProductCategory;
  image?: StrapiMedia;
  available?: boolean;
  slug?: string;
}

export interface MenuSection {
  __component: "layout.menu-section";
  id: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  products?: Product[]; // relación
}

/* -------------------------------------------------------------------------- */
/* Nosotros                                                                    */
/* -------------------------------------------------------------------------- */

export interface NosotrosSection {
  __component: "layout.nosotros-section";
  id: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: StrapiMedia;
  timeline?: TimelineItemComponent[];
}

/* -------------------------------------------------------------------------- */
/* Sucursal (Collection Type, no embebido en la sección)                      */
/* -------------------------------------------------------------------------- */

export interface Sucursal {
  id: number;
  nombre?: string;
  direccion?: string;
  telefono?: string;
  horario?: OpeningHoursComponent[];
  image?: StrapiMedia;
  mapLink?: MapLinkComponent;
}

export interface SucursalesSection {
  __component: "layout.sucursales-section";
  id: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  sucursales?: Sucursal[]; // relación
}

/* -------------------------------------------------------------------------- */
/* Contacto                                                                    */
/* -------------------------------------------------------------------------- */

export interface ContactoSection {
  __component: "layout.contacto-section";
  id: number;
  title?: string;
  description?: string;
  // teléfono/whatsapp/email NO viven aquí — vienen de SiteConfig
}

/* -------------------------------------------------------------------------- */
/* Home Page (Single Type)                                                    */
/* -------------------------------------------------------------------------- */

export interface HomePage {
  title: string;
  description: string;
  sections: Array<
    | HeroSection
    | NosotrosSection
    | MenuSection
    | SucursalesSection
    | ContactoSection
  >;
  homeSeo?: SeoComponent;
  updatedAt?: string;
}

/* -------------------------------------------------------------------------- */
/* Site Config (Single Type)                                                  */
/* -------------------------------------------------------------------------- */

export interface SiteConfig {
  siteName: string;
  logo?: StrapiMedia;
  favicon?: StrapiMedia;
  telefono?: string;
  whatsapp?: string;
  email?: string;
  redesSociales?: SocialLinkComponent[];
  defaultSeo?: SeoComponent;
}