'use client'

import Image from "next/image";
import { Button, ButtonVariant, ButtonSize, ButtonRounded } from "@/app/components/ui/button/Button";
import { getStrapiMedia } from "@/app/lib/strapi";
import { isHeroValid, getHeroCta, hasValidImage, hasText } from "@/app/lib/validate";
import type { HeroSection } from "@/app/lib/types";

interface HeroProps {
  data: HeroSection;
}

export default function Hero({ data }: HeroProps) {
  if (!isHeroValid(data)) return null;

  const { eyebrow, heading, headingHighlight, subHeading, image } = data;
  const cta = getHeroCta(data);
  const imageUrl = hasValidImage(image) ? getStrapiMedia(image) : null;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden text-amber-400 pt-32"
    >
      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col justify-between px-6 lg:px-12">
        {/* Texto */}
        <div className="z-10 flex flex-col">
          {hasText(eyebrow) && (
            <p className="mb-4 font-body text-lg uppercase tracking-[0.3em]">
              {eyebrow}
            </p>
          )}

          {(hasText(heading) || hasText(headingHighlight)) && (
            <h1 className="font-heading uppercase leading-[0.82]">
              {hasText(heading) && (
                <span className="block text-[clamp(5rem,14vw,13rem)]">
                  {heading}
                </span>
              )}
              {hasText(headingHighlight) && (
                <span className="block text-[clamp(7rem,20vw,18rem)] text-green-700">
                  {headingHighlight}
                </span>
              )}
            </h1>
          )}

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {hasText(subHeading) && (
              <p className="max-w-xl text-xl leading-relaxed">
                {subHeading}
              </p>
            )}

            {cta && (
              <Button
                label={cta.label}
                variant={ButtonVariant.Didi}
                size={ButtonSize.XXXLarge}
                rounded={ButtonRounded.Full}
                onClick={() => {
                  window.open(cta.href, cta.isExternal ? "_blank" : "_self");
                }}
              />
            )}
          </div>
        </div>

        {/* Imagen */}
        {imageUrl && (
          <div className="relative mt-10 h-[55vh] w-full lg:h-[65vh]">
            <Image
              src={imageUrl}
              alt={image?.alternativeText || "Tacos de Taquería 777"}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        )}
      </div>
    </section>
  );
}