"use client";

import { useState, FormEvent } from "react";
import { enviarMensajeContacto, ContactoSubmitError } from "@/app/lib/contacto";
import { contactoSchema } from "@/app/lib/schemas/contacto";
import { isContactoValid, hasText } from "@/app/lib/validate";
import type { ContactoSection, SiteConfig, SocialLinkComponent } from "@/app/lib/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  La sección "Contacto" del home-page solo trae title/description.
 *  El teléfono, whatsapp, email y redes sociales vienen de SiteConfig
 *  (Single Type separado), así que este componente recibe ambos.
 *
 *  El formulario sigue con el mismo TODO de antes: cuando tengas el
 *  Collection Type para mensajes de contacto en Strapi, reemplaza el
 *  setTimeout por un POST real.
 * ─────────────────────────────────────────────────────────────
 */

interface ContactoProps {
  data: ContactoSection;
  siteConfig: SiteConfig;
}

type EstadoEnvio = "idle" | "enviando" | "exito" | "error";
type FormErrors = Partial<Record<"nombre" | "telefono" | "mensaje", string>>;

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.31 2 11.63c0 1.92.57 3.71 1.55 5.22L2 22l5.36-1.42a10.5 10.5 0 0 0 4.64 1.08c5.52 0 10-4.31 10-9.63C22 6.31 17.52 2 12 2Zm0 17.4c-1.5 0-2.9-.4-4.1-1.1l-.3-.17-3.18.84.85-3-.2-.3a7.9 7.9 0 0 1-1.27-4.34c0-4.33 3.65-7.85 8.2-7.85s8.2 3.52 8.2 7.85-3.65 7.87-8.2 7.87Zm4.5-5.87c-.24-.12-1.44-.7-1.67-.78-.22-.08-.38-.12-.55.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19-.72-.63-1.2-1.4-1.34-1.64-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.3-.75-1.78-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.6 4.14 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 22v-8h2.7l.4-3.2H14V8.6c0-.93.26-1.56 1.6-1.56H17V4.14C16.7 4.1 15.68 4 14.5 4 12 4 10.3 5.5 10.3 8.3v2.5H7.6V14h2.7v8h3.7Z" />
    </svg>
  );
}

/** Mapea el nombre de plataforma (tal como lo escribas en Strapi) a un ícono. */
function SocialIcon({ plataforma }: { plataforma: string }) {
  const key = plataforma.trim().toLowerCase();
  if (key.includes("instagram")) return <InstagramIcon />;
  if (key.includes("facebook")) return <FacebookIcon />;
  if (key.includes("whatsapp")) return <WhatsappIcon />;
  return null;
}

/** Strapi guarda el teléfono como texto libre; lo limpiamos para el href tel:. */
function toTelHref(telefono?: string): string | null {
  if (!hasText(telefono)) return null;
  const digits = telefono.replace(/\D/g, "");
  return digits ? `tel:+52${digits}` : null;
}

/** Igual para whatsapp — asumimos número mexicano de 10 dígitos. */
function toWhatsappHref(whatsapp?: string): string | null {
  if (!hasText(whatsapp)) return null;
  const digits = whatsapp.replace(/\D/g, "");
  return digits ? `https://wa.me/52${digits}` : null;
}
interface ContactoProps {
  data: ContactoSection;
  siteConfig: SiteConfig;
}


export default function Contacto({ data, siteConfig }: ContactoProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (
    !isContactoValid(
      data,
      siteConfig?.telefono,
      siteConfig?.whatsapp,
      siteConfig?.email
    )
  ) {
    return null;
  }

  const { title, description } = data;
  const telefonoHref = toTelHref(siteConfig.telefono);
  const whatsappHref = toWhatsappHref(siteConfig.whatsapp);
  const redes: SocialLinkComponent[] = siteConfig.redesSociales ?? [];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setErrorMsg("");

    const result = contactoSchema.safeParse({ nombre, telefono, mensaje });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setEstado("enviando");

    try {
      await enviarMensajeContacto(result.data);
      setEstado("exito");
      setNombre("");
      setTelefono("");
      setMensaje("");
    } catch (err) {
      setEstado("error");
      setErrorMsg(
        err instanceof ContactoSubmitError
          ? err.message
          : "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp."
      );
    }
  }

  return (
    <section id="contacto" className="relative bg-[#7C0F14] py-24 px-6 sm:px-10 overflow-hidden">
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-full w-[38%] bg-[#0F6B3C]"
        style={{ clipPath: "polygon(0 0, 65% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#F5A623]">
            ¿NOS BUSCAS?
          </p>
          <h2 className="text-6xl sm:text-7xl font-black uppercase leading-[0.9] text-[#F5A623] tracking-tight">
            {title || "Contacto"}
          </h2>
          {hasText(description) && (
            <p className="mt-5 max-w-md text-lg text-[#FBD9AE]">{description}</p>
          )}

          <div className="mt-10 flex flex-col gap-5 text-[#FBD9AE]">
            {telefonoHref && (
              <a
                href={telefonoHref}
                className="flex items-center gap-3 text-lg font-semibold hover:text-[#F5A623] transition-colors"
              >
                {siteConfig.telefono}
              </a>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F6B3C] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623]"
              >
                <WhatsappIcon />
                WhatsApp
              </a>
            )}

            {redes
              .filter((r) => hasText(r.plataforma) && hasText(r.url))
              .map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.plataforma}
                  className="text-[#F5A623] transition-transform hover:scale-110"
                >
                  <SocialIcon plataforma={r.plataforma} />
                </a>
              ))}
          </div>
        </div >

        <div className="rounded-2xl bg-[#A8151C] p-8 shadow-lg ring-1 ring-black/10 sm:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor="nombre" className="text-sm font-bold uppercase tracking-wide text-[#F5A623]">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
                className="rounded-lg border-2 border-transparent bg-[#7C0F14] px-4 py-3 text-[#FBD9AE] placeholder:text-[#E8B58C]/60 outline-none transition-colors focus:border-[#F5A623]"
              />
              {errors.nombre && (
                <p id="nombre-error" role="alert" className="text-sm font-semibold text-[#FFB4B4]">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="telefono" className="text-sm font-bold uppercase tracking-wide text-[#F5A623]">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="646 123 4567"
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? "telefono-error" : undefined}
                className="rounded-lg border-2 border-transparent bg-[#7C0F14] px-4 py-3 text-[#FBD9AE] placeholder:text-[#E8B58C]/60 outline-none transition-colors focus:border-[#F5A623]"
              />
              {errors.telefono && (
                <p id="telefono-error" role="alert" className="text-sm font-semibold text-[#FFB4B4]">
                  {errors.telefono}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="text-sm font-bold uppercase tracking-wide text-[#F5A623]">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Cuéntanos qué necesitas..."
                aria-invalid={!!errors.mensaje}
                aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                className="resize-none rounded-lg border-2 border-transparent bg-[#7C0F14] px-4 py-3 text-[#FBD9AE] placeholder:text-[#E8B58C]/60 outline-none transition-colors focus:border-[#F5A623]"
              />
              {errors.mensaje && (
                <p id="mensaje-error" role="alert" className="text-sm font-semibold text-[#FFB4B4]">
                  {errors.mensaje}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#F5A623] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#7C0F14] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
            </button>

            {estado === "exito" && (
              <p role="status" className="text-sm font-semibold text-[#8FE3B0]">
                Listo, recibimos tu mensaje. Te contactamos pronto.
              </p>
            )}
            {estado === "error" && (
              <p role="alert" className="text-sm font-semibold text-[#FFB4B4]">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div >
    </section >
  );
}