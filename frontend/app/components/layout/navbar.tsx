'use client';

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button, ButtonVariant, ButtonSize, ButtonRounded } from "../ui/button/Button";
import { useEffect, useState } from "react";

export default function NavMenu() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Menú", href: "#menu" },
        { name: "Sucursales", href: "#sucursales" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll(); // por si ya carga con scroll (ej. refresh a mitad de página)
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Bloquea el scroll del body mientras el menú móvil está abierto
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const scrollToSection = (href: string) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <header
                className={` font-heading text-yellow-400
    fixed inset-x-0 top-0 z-50
    transition-all duration-500
${isScrolled
                        ? "bg-[#FFF7A8]/90 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                    }
  `}
            >
                <div className="flex items-center justify-between px-6 sm:px-16 py-3 ">
                    {/* Logo */}
                    <Link
                        href="#inicio"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#inicio");
                        }}
                        className="flex items-center gap-2 z-50"
                    >
                        <Image
                            src="/logo-cantinflas-nbg.png"
                            alt={`Logo de tacos777`}
                            width={80}
                            height={80}
                            className=""
                        />
                        <h1
                            className={`overflow-hidden whitespace-nowrap text-3xl uppercase tracking-tight  transition-all duration-300 ease-in-out ${isScrolled
                                ? "max-w-0 -translate-x-6 opacity-0"
                                : "max-w-xs translate-x-0 opacity-100"
                                }`}
                        >
                            Taqueria<span className="text-green-700">777</span>
                        </h1>
                    </Link>

                    {/* Nav de escritorio */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-4">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        className={`text-3xl
${isScrolled
                                                ? "text-green-700 hover:text-green-900"
                                                : "text-yellow-400 hover:text-yellow-600"
                                            }`}>

                                        {item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Botón hamburguesa — solo en móvil */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMenuOpen}
                        className={`md:hidden z-50 p-1 transition-colors duration-300 ${isScrolled ? "text-green-700" : "text-yellow-400"
                            }`}
                    >
                        <Menu
                            size={32}
                            className={`transition-all duration-200 ${isMenuOpen ? "scale-0 opacity-0 absolute" : "scale-100 opacity-100"
                                }`}
                        />
                        <X
                            size={32}
                            className={`transition-all duration-200 ${isMenuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 absolute"
                                }`}
                        />
                    </button>

                    {/* <Button label="Ordenar en didi"
                    variant={ButtonVariant.Didi}
                    size={ButtonSize.XLarge}
                    onClick={() => {
                        console.log("Ordenar en didi clicked");
                    }}
                    rounded={ButtonRounded.Full}
                /> */}
                </div>
            </header>

            {/*
                Overlay de menú móvil — pantalla completa.
                IMPORTANTE: vive FUERA del <header>, como hermano, no como hijo.
                El header usa backdrop-blur-md cuando isScrolled es true, y
                backdrop-filter (igual que filter/transform) crea un nuevo
                "containing block" para los elementos fixed que tenga dentro.
                Si el overlay estuviera anidado en el header, se posicionaría
                relativo al header (y a su scroll/tamaño) en vez de relativo
                a la ventana completa — que es justo el desfase que se veía.
            */}
            <div
                className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8
                    bg-[#FFF3D6] transition-opacity duration-300 ease-in-out
                    ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            >
                <ul className="flex flex-col items-center gap-8">
                    {menuItems.map((item, index) => (
                        <li
                            key={item.href}
                            className={`transition-all duration-300 ease-out ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                }`}
                            style={{ transitionDelay: isMenuOpen ? `${index * 75}ms` : "0ms" }}
                        >
                            <Link
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className="text-5xl uppercase font-heading text-green-700 hover:text-red-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}