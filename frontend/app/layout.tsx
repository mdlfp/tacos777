import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { getSiteConfig, getStrapiMedia } from "@/app/lib/strapi";
import { hasText } from "@/app/lib/validate";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const faviconUrl = getStrapiMedia(siteConfig.favicon);
  const defaultSeo = siteConfig.defaultSeo;

  const title = hasText(siteConfig.siteName) ? siteConfig.siteName : "Taqueria777";
  const description = hasText(defaultSeo?.metaDescription)
    ? defaultSeo!.metaDescription
    : "Ofrecemos tacos de calidad y sabor excepcional en un ambiente acogedor y familiar. ¡Ven y disfruta de la auténtica experiencia mexicana con nosotros!";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}