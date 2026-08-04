import NavMenu from "./components/layout/navbar";
import Hero from "./components/sections/hero";
import Image from "next/image";
import Menu from "./components/sections/menu";
import Sucursales from "./components/sections/sucursales";
import Contacto from "./components/sections/contacto";
import Nosotros from "./components/sections/nosotros";

export default function Home() {
  return (
    <div>
      <NavMenu />
      <Hero />
      <Menu />
      <Nosotros/>
      <Sucursales />
      <Contacto />
    </div>
  );
}