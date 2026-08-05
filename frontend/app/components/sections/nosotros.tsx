import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────
 *  Pensado para un Single Type "nosotros" en Strapi con:
 *  historia (richtext), imagenPrincipal (media), hitos (component
 *  repetible: anio + texto). Reemplaza NOSOTROS_MOCK por el fetch
 *  cuando el backend esté listo.
 * ─────────────────────────────────────────────────────────────
 */

interface Hito {
  anio: string;
  texto: string;
}

interface NosotrosData {
  historia: string[]; // párrafos
  imagenUrl: string;
  hitos: Hito[];
}

const NOSOTROS_MOCK: NosotrosData = {
  historia: [
    "777 nació en 2009 como un carrito frente al mercado, con don Beto asando carne al carbón antes de que amaneciera. No había mesas, solo la fila.",
    "Con los años la fila se volvió local, y el local se volvió tres. Pero la receta —la misma masa, el mismo carbón, la misma salsa que nadie ha logrado copiar— no ha cambiado nunca.",
  ],
  imagenUrl: "/nosotros/asador.png",
  hitos: [
    { anio: "2009", texto: "El carrito abre frente al mercado de Ensenada." },
    { anio: "2014", texto: "Primer local propio en el Centro." },
    { anio: "2019", texto: "Llegan Chapultepec y Playitas." },
    { anio: "Hoy", texto: "Misma receta, misma familia detrás del asador." },
  ],
};

export default function Nosotros({ data = NOSOTROS_MOCK }: { data?: NosotrosData }) {
  return (
    <section id="nosotros" className="bg-[#FBF3E4] py-24 px-6 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#0F6B3C]">
            DESDE 2009
          </p>
          <h2 className="text-6xl sm:text-7xl font-black uppercase leading-[0.9] text-[#C81D25] tracking-tight">
            Nosotros
          </h2>
        </div>

        {/* Historia + imagen */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="relative order-2 md:order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#7C0F14]">
            <Image
              src={data.imagenUrl}
              alt="El asador de Taquería 777"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="order-1 md:order-2 flex flex-col gap-5">
            {data.historia.map((parrafo, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-[#4A2A1D]"
              >
                {parrafo}
              </p>
            ))}
          </div>
        </div>

        {/* Línea de tiempo — aquí el orden sí importa, es una cronología real */}
        <div className="mt-24">
          <div className="relative border-l-2 border-[#0F6B3C]/30 pl-8 sm:pl-10">
            <ol className="flex flex-col gap-10">
              {data.hitos.map((hito) => (
                <li key={hito.anio} className="relative">
                  <span
                    className="absolute -left-[calc(2rem+5px)] sm:-left-[calc(2.5rem+5px)] top-1 h-3 w-3 rounded-full bg-[#C81D25] ring-4 ring-[#FBF3E4]"
                    aria-hidden="true"
                  />
                  <span className="block text-sm font-black uppercase tracking-wide text-[#0F6B3C]">
                    {hito.anio}
                  </span>
                  <span className="mt-1 block text-lg text-[#4A2A1D]">
                    {hito.texto}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}