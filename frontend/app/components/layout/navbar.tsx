'use client'

import Link from "next/link";
import Image from "next/image";
import { Button, ButtonVariant, ButtonSize, ButtonRounded } from "../ui/button/Button";
import { useEffect, useState } from "react";

export default function NavMenu() {
    const [isScrolled, setIsScrolled] = useState(false);


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

    const scrollToSection = (href: string) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
        }
    };

    return (
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
            <div className="flex items-center justify-between px-16 py-3 ">
                {/* Logo */}
                <Link
                    href="#inicio"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#inicio");
                    }}
                    className="flex items-center gap-2"
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
                <nav>
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
    )
} 