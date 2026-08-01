import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";


export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Taqueria777",
  description: "Ofrecemos tacos de calidad y sabor excepcional en un ambiente acogedor y familiar. ¡Ven y disfruta de la auténtica experiencia mexicana con nosotros!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
