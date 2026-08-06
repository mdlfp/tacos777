'use client';

import { useState, useMemo } from 'react';
import { groupProductsByCategory, isMenuSectionValid, hasText } from '@/app/lib/validate';
import type { MenuSection as MenuSectionData } from '@/app/lib/types';

// ---------------------------------------------------------------------------
// Design notes (para futuro-yo / quien edite esto):
// - Paleta tomada del hero: rojo #C41E2A, dorado #F5B301,
//   verde #1B7A43, más un crema cálido (#FFF3D6) para la superficie del menú
//   y un carbón tinta (#241C15) para el texto de cuerpo.
// - Tipografía display: Anton. Tipografía de cuerpo/precios: Inter.
// - Elemento de firma: cada item de menú usa una línea de precio con
//   puntos guía, como un menú de puesto de tacos o un ticket de papel.
// - Las categorías y los items ahora vienen de Strapi (relación `products`
//   con `product_category`), no de datos fijos.
// ---------------------------------------------------------------------------

function formatPrice(n: number): string {
  return `$${n}`;
}

interface MenuProps {
  data: MenuSectionData;
}

export default function Menu({ data }: MenuProps) {
  const grouped = useMemo(() => groupProductsByCategory(data.products), [data.products]);
  const categories = useMemo(() => Object.keys(grouped), [grouped]);

  const [active, setActive] = useState<string | null>(categories[0] ?? null);

  if (!isMenuSectionValid(data) || !active) return null;

  const items = grouped[active] ?? [];

  const {eyebrow} = data;

  return (
    <section
      id="menu"
      className="relative py-20 px-6 sm:px-10"
      style={{ backgroundColor: '#FFF3D6' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
        .menu-display { font-family: 'Anton', sans-serif; }
        .menu-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Borde superior rasgado, como un menú pegado a la pared */}
      <div
        className="absolute top-0 left-0 right-0 h-3"
        style={{
          backgroundColor: '#C41E2A',
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 40%, 96% 100%, 92% 40%, 88% 100%, 84% 40%, 80% 100%, 76% 40%, 72% 100%, 68% 40%, 64% 100%, 60% 40%, 56% 100%, 52% 40%, 48% 100%, 44% 40%, 40% 100%, 36% 40%, 32% 100%, 28% 40%, 24% 100%, 20% 40%, 16% 100%, 12% 40%, 8% 100%, 4% 40%, 0% 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          {hasText(eyebrow) && (
            <p
              className="menu-body text-sm font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: '#C41E2A' }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className="menu-display text-5xl sm:text-6xl uppercase leading-none"
            style={{ color: '#241C15' }}
          >
            {data.title || 'El Menú'}
          </h2>
          {data.description && (
            <p
              className="menu-body text-sm mt-2"
              style={{ color: '#241C15', opacity: 0.7 }}
            >
              {data.description}
            </p>
          )}
        </div>

        {/* Tabs de categoría, generados dinámicamente desde Strapi */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="menu-body px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors duration-150"
                  style={
                    isActive
                      ? { backgroundColor: '#F5B301', color: '#241C15' }
                      : {
                        backgroundColor: 'transparent',
                        color: '#1B7A43',
                        border: '2px solid #1B7A43',
                      }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Items del menú — estilo ticket con línea de puntos */}
        <ul className="flex flex-col gap-6">
          {items.map((product) => (
            <li key={product.id} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span
                  className="menu-display text-xl sm:text-2xl uppercase shrink-0"
                  style={{ color: '#241C15' }}
                >
                  {product.name}
                </span>
                <span
                  className="flex-1 border-b-2 border-dotted mb-1"
                  style={{ borderColor: '#241C15', opacity: 0.35 }}
                  aria-hidden="true"
                />
                <span
                  className="menu-display text-xl sm:text-2xl shrink-0"
                  style={{ color: '#C41E2A' }}
                >
                  {formatPrice(product.basePrice!)}
                </span>
              </div>
              {product.description && (
                <p
                  className="menu-body text-sm mt-1"
                  style={{ color: '#241C15', opacity: 0.7 }}
                >
                  {product.description}
                </p>
              )}
            </li>
          ))}
        </ul>

        <p
          className="menu-body text-xs mt-12 text-center"
          style={{ color: '#241C15', opacity: 0.5 }}
        >
          Precios en pesos mexicanos. Sujetos a cambio sin previo aviso.
        </p>
      </div>
    </section>
  );
}