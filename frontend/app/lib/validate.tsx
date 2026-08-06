// lib/validate.tsx

import type {
  HeroSection,
  MenuSection,
  Product,
  NosotrosSection,
  SucursalesSection,
  Sucursal,
  ContactoSection,
  TimelineItemComponent,
  OpeningHoursComponent,
  StrapiMedia,
  LinkComponent,
  MapLinkComponent,
} from "@/app/lib/types";

/* -------------------------------------------------------------------------- */
/* Helpers genéricos                                                          */
/* -------------------------------------------------------------------------- */

export function hasText(value?: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function hasValidImage(
  media?: StrapiMedia | null
): media is StrapiMedia {
  return !!media?.url && hasText(media.url);
}

export function hasValidLink(
  link?: LinkComponent | null
): link is LinkComponent {
  return !!link && hasText(link.label) && hasText(link.url);
}

export function hasValidMapLink(
  link?: MapLinkComponent | null
): link is MapLinkComponent {
  return !!link && hasText(link.href);
}

export function hasValidPrice(value?: number | null): value is number {
  return typeof value === "number" && !Number.isNaN(value) && value > 0;
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

/** El Hero se muestra si al menos tiene heading. */
export function isHeroValid(data?: HeroSection | null): boolean {
  if (!data) return false;
  return hasText(data.heading);
}

/** El Hero solo tiene un ctaLink real si el array trae al menos una entrada válida. */
export function getHeroCta(data?: HeroSection | null): LinkComponent | null {
  const cta = data?.ctaLink?.find(hasValidLink);
  return cta ?? null;
}

/* -------------------------------------------------------------------------- */
/* Menú                                                                       */
/* -------------------------------------------------------------------------- */

/** Un producto solo es válido si tiene nombre, precio y está disponible. */
export function isProductValid(product?: Product | null): product is Product {
  if (!product) return false;
  if (product.available === false) return false;
  return hasText(product.name) && hasValidPrice(product.basePrice);
}

export function getValidProducts(products?: Product[] | null): Product[] {
  if (!products) return [];
  return products.filter(isProductValid);
}

/**
 * Agrupa productos válidos por product_category.name.
 * Los productos sin categoría se agrupan bajo "Otros".
 */
export function groupProductsByCategory(
  products?: Product[] | null
): Record<string, Product[]> {
  const valid = getValidProducts(products);

  return valid.reduce<Record<string, Product[]>>((acc, product) => {
    const key = product.product_category?.name?.trim() || "Otros";
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});
}

/** La sección de menú solo se muestra si hay al menos un producto válido. */
export function isMenuSectionValid(data?: MenuSection | null): boolean {
  if (!data) return false;
  return getValidProducts(data.products).length > 0;
}

/* -------------------------------------------------------------------------- */
/* Nosotros                                                                    */
/* -------------------------------------------------------------------------- */

/** Un item de timeline solo es válido si tiene título (year es opcional). */
export function isTimelineItemValid(
  item?: TimelineItemComponent | null
): item is TimelineItemComponent {
  if (!item) return false;
  return hasText(item.title);
}

export function getValidTimeline(
  timeline?: TimelineItemComponent[] | null
): TimelineItemComponent[] {
  if (!timeline) return [];
  return timeline.filter(isTimelineItemValid);
}

/** La sección Nosotros se muestra si hay description O al menos un item de timeline. */
export function isNosotrosValid(data?: NosotrosSection | null): boolean {
  if (!data) return false;
  return hasText(data.description) || getValidTimeline(data.timeline).length > 0;
}

/* -------------------------------------------------------------------------- */
/* Sucursales                                                                  */
/* -------------------------------------------------------------------------- */

/** Un horario individual solo es válido si tiene día y al menos una hora. */
export function isOpeningHourValid(
  hour?: OpeningHoursComponent | null
): hour is OpeningHoursComponent {
  if (!hour) return false;
  return !!hour.dayOfWeek && (hasText(hour.opens) || hasText(hour.closes));
}

export function getValidHorario(
  horario?: OpeningHoursComponent[] | null
): OpeningHoursComponent[] {
  if (!horario) return [];
  return horario.filter(isOpeningHourValid);
}

/** Una sucursal necesita al menos nombre y dirección para tener sentido. */
export function isSucursalValid(
  sucursal?: Sucursal | null
): sucursal is Sucursal {
  if (!sucursal) return false;
  return hasText(sucursal.nombre) && hasText(sucursal.direccion);
}

export function getValidSucursales(
  sucursales?: Sucursal[] | null
): Sucursal[] {
  if (!sucursales) return [];
  return sucursales.filter(isSucursalValid);
}

/** La sección de sucursales solo se muestra si hay al menos una válida. */
export function isSucursalesSectionValid(
  data?: SucursalesSection | null
): boolean {
  if (!data) return false;
  return getValidSucursales(data.sucursal).length > 0;
}

/* -------------------------------------------------------------------------- */
/* Contacto                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Contacto solo tiene title/description en la sección; el resto de la info
 * de contacto real (teléfono, whatsapp, email) viene de SiteConfig, así que
 * la validación combina ambas fuentes.
 */
export function isContactoValid(
  data?: ContactoSection | null,
  siteTelefono?: string | null,
  siteWhatsapp?: string | null,
  siteEmail?: string | null
): boolean {
  if (!data) return false;
  return hasText(siteTelefono) || hasText(siteWhatsapp) || hasText(siteEmail);
}