import Image from "next/image";
import { getStrapiMedia } from "@/app/lib/strapi";
import {
  isNosotrosValid,
  getValidTimeline,
  hasValidImage,
  hasText,
} from "@/app/lib/validate";
import type { NosotrosSection } from "@/app/lib/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  Conectado a la sección "Nosotros" del Single Type home-page
 *  en Strapi: title, description (texto con párrafos separados
 *  por salto de línea), image, timeline (component repetible:
 *  title, year, description).
 * ─────────────────────────────────────────────────────────────
 */

interface NosotrosProps {
  data: NosotrosSection;
}

/** Strapi guarda la historia como un solo textarea; la partimos en párrafos. */
function getParagraphs(text?: string): string[] {
  if (!hasText(text)) return [];
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export default function Nosotros({ data }: NosotrosProps) {
  if (!isNosotrosValid(data)) return null;

  const { title, description, image, eyebrow } = data;
  const paragraphs = getParagraphs(description);
  const timeline = getValidTimeline(data.timeline);
  const imageUrl = hasValidImage(image) ? getStrapiMedia(image) : null;

  return (
    <section id="nosotros" className="bg-[#FBF3E4] py-24 px-6 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="mb-16 max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#0F6B3C]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-6xl sm:text-7xl font-black uppercase leading-[0.9] text-[#C81D25] tracking-tight">
            {title || "Nosotros"}
          </h2>
        </div>

        {/* Historia + imagen */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {imageUrl && (
            <div className="relative order-2 md:order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#7C0F14]">
              <Image
                src={imageUrl}
                alt={image?.alternativeText || "El asador de Taquería 777"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}

          {paragraphs.length > 0 && (
            <div className="order-1 md:order-2 flex flex-col gap-5">
              {paragraphs.map((parrafo, i) => (
                <p key={i} className="text-lg leading-relaxed text-[#4A2A1D]">
                  {parrafo}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Línea de tiempo — el orden importa, es una cronología real */}
        {timeline.length > 0 && (
          <div className="mt-24">
            <div className="relative border-l-2 border-[#0F6B3C]/30 pl-8 sm:pl-10">
              <ol className="flex flex-col gap-10">
                {timeline.map((hito) => (
                  <li key={hito.id} className="relative">
                    <span
                      className="absolute -left-[calc(2rem+5px)] sm:-left-[calc(2.5rem+5px)] top-1 h-3 w-3 rounded-full bg-[#C81D25] ring-4 ring-[#FBF3E4]"
                      aria-hidden="true"
                    />
                    {hasText(hito.year) && (
                      <span className="block text-sm font-black uppercase tracking-wide text-[#0F6B3C]">
                        {hito.year}
                      </span>
                    )}
                    <span className="mt-1 block text-lg text-[#4A2A1D]">
                      {hito.title}
                      {hasText(hito.description) && (
                        <span className="block text-base opacity-80">
                          {hito.description}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}