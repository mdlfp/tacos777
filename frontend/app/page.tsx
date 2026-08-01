import NavMenu from "./components/layout/navbar";
import Hero from "./components/sections/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavMenu />
      <Hero />
      <div id="menu" className="min-h-screen flex justify-center items-center">Menu</div>
      <div id="about" className="min-h-screen flex justify-center items-center">Nosotros</div>
      <div id="sucursales" className="min-h-screen flex justify-center items-center">Sucursales</div>
      <div id="contact" className="min-h-screen flex justify-center items-center">Contacto</div>
    </div>
  );
}