import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────
 *  TIPOS — pensados para calzar 1:1 con una Collection Type
 *  "sucursal" en Strapi. Cuando conectes el backend, sustituye
 *  MOCK_SUCURSALES por un fetch a `/api/sucursales?populate=*`
 *  y mapea la respuesta a esta misma forma.
 * ─────────────────────────────────────────────────────────────
 */
export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  colonia: string;
  telefono: string;
  horario: string;
  mapsUrl: string;
  imagenUrl: string;
  destacada?: boolean; // marca la sucursal principal / matriz
}

const MOCK_SUCURSALES: Sucursal[] = [
  {
    id: "centro",
    nombre: "777 Centro",
    direccion: "Av. Ruiz 777",
    colonia: "Zona Centro, Ensenada",
    telefono: "(646) 123 4567",
    horario: "Todos los días · 6:00 pm – 2:00 am",
    mapsUrl: "https://maps.google.com/?q=Av+Ruiz+Ensenada",
    imagenUrl: "/sucursales/sucursal-delante.jpg",
    destacada: true,
  },
  {
    id: "chapultepec",
    nombre: "777 Chapultepec",
    direccion: "Calz. Cortez 1450",
    colonia: "Chapultepec, Ensenada",
    telefono: "(646) 234 5678",
    horario: "Mié – Lun · 6:00 pm – 1:00 am",
    mapsUrl: "https://maps.google.com/?q=Chapultepec+Ensenada",
    imagenUrl: "/sucursales/sucursal-porticos.jpg",
  },
  {
    id: "playitas",
    nombre: "777 Playitas",
    direccion: "Blvd. Costero 220",
    colonia: "Playitas, Ensenada",
    telefono: "(646) 345 6789",
    horario: "Jue – Mar · 5:00 pm – 1:00 am",
    mapsUrl: "https://maps.google.com/?q=Playitas+Ensenada",
    imagenUrl: "/sucursales/sucursal-cortez.jpg",
  },
];

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.25-.25.6-.33.93-.22 1.03.34 2.14.52 3.27.52.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.3 20.6 3.4 13.7 3.4 5.2c0-.55.45-1 1-1H8c.55 0 1 .45 1 1 0 1.14.18 2.24.52 3.27.11.33.03.68-.22.93l-2.7 2.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Sucursales({
  sucursales = MOCK_SUCURSALES,
}: {
  sucursales?: Sucursal[];
}) {
  return (
    <section id="sucursales" className="relative bg-[#C81D25] py-24 px-6 sm:px-10 overflow-hidden">
      {/* Bloque diagonal verde de fondo, eco del "7" del hero */}
      <div
        className="pointer-events-none absolute -right-24 top-0 h-full w-[42%] bg-[#0F6B3C]"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Encabezado, mismo lenguaje tipográfico que el hero */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#F5A623]">
            ENSENADA, B.C.
          </p>
          <h2 className="text-6xl sm:text-7xl font-black uppercase leading-[0.9] text-[#F5A623] tracking-tight">
            Sucursales
          </h2>
          <p className="mt-5 text-lg text-[#FBD9AE]">
            Encuentra la 777 más cerca de ti. Mismo sabor, misma receta, en
            cada punto de Ensenada.
          </p>
        </div>

        {/* Grid de sucursales */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {sucursales.map((s) => (
            <article
              key={s.id}
              className={`group flex flex-col overflow-hidden rounded-2xl bg-[#A8151C] shadow-lg ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-1 ${
                s.destacada ? "md:col-span-1 ring-2 ring-[#F5A623]" : ""
              }`}
            >
              <div className="relative h-44 w-full bg-[#7C0F14]">
                <Image
                  src={s.imagenUrl}
                  alt={`Fachada de ${s.nombre}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
                {s.destacada && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#F5A623] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#7C0F14]">
                    Matriz
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-2xl font-black uppercase text-[#F5A623]">
                  {s.nombre}
                </h3>

                <ul className="flex flex-1 flex-col gap-3 text-sm text-[#FBD9AE]">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#F5A623]">
                      <PinIcon />
                    </span>
                    <span>
                      {s.direccion}
                      <br />
                      <span className="text-[#E8B58C]">{s.colonia}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F5A623]">
                      <ClockIcon />
                    </span>
                    {s.horario}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F5A623]">
                      <PhoneIcon />
                    </span>
                    {s.telefono}
                  </li>
                </ul>

                <a
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center rounded-full border-2 border-[#F5A623] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#F5A623] transition-colors duration-200 hover:bg-[#F5A623] hover:text-[#7C0F14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623]"
                >
                  Cómo llegar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}