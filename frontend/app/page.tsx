import NavMenu from "./components/layout/navbar";
import Hero from "./components/sections/hero";
import Menu from "./components/sections/menu";
import Sucursales from "./components/sections/sucursales";
import Contacto from "./components/sections/contacto";
import Nosotros from "./components/sections/nosotros";
import { getHomePage, getSiteConfig } from "@/app/lib/strapi";
import type {
  HeroSection,
  NosotrosSection,
  MenuSection,
  SucursalesSection,
  ContactoSection,
} from "@/app/lib/types";
import { buildMetadata } from "./lib/seo";
import { Metadata } from "next";
import { buildRestaurantJsonLd } from "./lib/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const [homePage, siteConfig] = await Promise.all([
    getHomePage(),
    getSiteConfig(),
  ]);

  return buildMetadata(homePage.homeSeo, siteConfig);
}

export default async function Home() {
  const [homePage, siteConfig] = await Promise.all([
    getHomePage(),
    getSiteConfig(),
  ]);

  const heroSection = homePage.sections.find(
    (s): s is HeroSection => s.__component === "layout.hero-section"
  );
  const nosotrosSection = homePage.sections.find(
    (s): s is NosotrosSection => s.__component === "layout.nosotros-section"
  );
  const menuSection = homePage.sections.find(
    (s): s is MenuSection => s.__component === "layout.menu-section"
  );
  const sucursalesSection = homePage.sections.find(
    (s): s is SucursalesSection => s.__component === "layout.sucursales-section"
  );
  const contactoSection = homePage.sections.find(
    (s): s is ContactoSection => s.__component === "layout.contacto-section"
  );

  const sucursalesSectionData = homePage.sections.find(
    (s): s is SucursalesSection => s.__component === "layout.sucursales-section"
  );

  const jsonLd = buildRestaurantJsonLd({
    siteConfig,
    sucursales: sucursalesSectionData?.sucursales,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://taqueria777.com",
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavMenu />
      {heroSection && <Hero data={heroSection} />}
      {menuSection && <Menu data={menuSection} />}
      {nosotrosSection && <Nosotros data={nosotrosSection} />}
      {sucursalesSection && <Sucursales data={sucursalesSection} />}
      {contactoSection && (
        <Contacto data={contactoSection} siteConfig={siteConfig} />
      )}
    </div>
  );
}