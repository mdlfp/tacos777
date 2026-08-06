import Image from "next/image";
import { getStrapiMedia } from "@/app/lib/strapi";
import {
  isSucursalesSectionValid,
  getValidSucursales,
  getValidHorario,
  hasValidImage,
  hasValidMapLink,
  hasText,
} from "@/app/lib/validate";
import type { SucursalesSection, OpeningHoursComponent } from "@/app/lib/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  Conectado a la sección "Sucursales" del Single Type home-page:
 *  title, description, sucursal (relación a la Collection Type
 *  Sucursal: nombre, direccion, telefono, horario[], image, mapLink).
 * ─────────────────────────────────────────────────────────────
 */

interface SucursalesProps {
  data: SucursalesSection;
}

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

/**
 * Formato provisional: junta el horario en una sola línea.
 * "Los detalles los arreglamos después" — aquí solo evitamos
 * que truene si hay días con horario incompleto.
 */
function formatHorario(horario: OpeningHoursComponent[]): string {
  const valid = getValidHorario(horario);
  if (valid.length === 0) return "";

  const primero = valid[0];
  if (hasText(primero.opens) && hasText(primero.closes)) {
    return `${primero.opens} – ${primero.closes}`;
  }
  return "";
}

export default function Sucursales({ data }: SucursalesProps) {
  if (!isSucursalesSectionValid(data)) return null;

  const { title, description, eyebrow } = data;
  const sucursales = getValidSucursales(data.sucursales);

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
          {eyebrow && (
            <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#F5A623]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-6xl sm:text-7xl font-black uppercase leading-[0.9] text-[#F5A623] tracking-tight">
            {title || "Sucursales"}
          </h2>
          {hasText(description) && (
            <p className="mt-5 text-lg text-[#FBD9AE]">{description}</p>
          )}
        </div>

        {/* Grid de sucursales */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {sucursales.map((s) => {
            const imageUrl = hasValidImage(s.image) ? getStrapiMedia(s.image) : null;
            const horarioTexto = formatHorario(s.horario ?? []);
            const mapLink = hasValidMapLink(s.mapLink) ? s.mapLink : null;

            return (
              <article
                key={s.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-[#A8151C] shadow-lg ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-1"
              >
                {imageUrl && (
                  <div className="relative h-44 w-full bg-[#7C0F14]">
                    <Image
                      src={imageUrl}
                      alt={`Fachada de ${s.nombre}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-2xl font-black uppercase text-[#F5A623]">
                    {s.nombre}
                  </h3>

                  <ul className="flex flex-1 flex-col gap-3 text-sm text-[#FBD9AE]">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#F5A623]">
                        <PinIcon />
                      </span>
                      <span>{s.direccion}</span>
                    </li>

                    {horarioTexto && (
                      <li className="flex items-center gap-2">
                        <span className="text-[#F5A623]">
                          <ClockIcon />
                        </span>
                        {horarioTexto}
                      </li>
                    )}

                    {hasText(s.telefono) && (
                      <li className="flex items-center gap-2">
                        <span className="text-[#F5A623]">
                          <PhoneIcon />
                        </span>
                        {s.telefono}
                      </li>
                    )}
                  </ul>

                  {mapLink && (
                    <a
                      href={mapLink.href}
                      target={mapLink.isExternal ? "_blank" : undefined}
                      rel={mapLink.isExternal ? "noopener noreferrer" : undefined}
                      className="mt-2 inline-flex items-center justify-center rounded-full border-2 border-[#F5A623] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#F5A623] transition-colors duration-200 hover:bg-[#F5A623] hover:text-[#7C0F14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623]"
                    >
                      {mapLink.label || "Cómo llegar"}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}