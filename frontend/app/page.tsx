import NavMenu from "./components/layout/navbar";
import Hero from "./components/sections/hero";
import Image from "next/image";
import Menu from "./components/sections/menu";

export default function Home() {
  return (
    <div>
      <NavMenu />
      <Hero />
      <Menu/>
      <div id="about" className="min-h-screen flex justify-center items-center">Nosotros</div>
      <div id="sucursales" className="min-h-screen flex justify-center items-center">Sucursales</div>
      <div id="contact" className="min-h-screen flex justify-center items-center">Contacto</div>
    </div>
  );
}