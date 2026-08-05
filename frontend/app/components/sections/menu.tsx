'use client';

import { useState } from 'react';

// ---------------------------------------------------------------------------
// Design notes (for future-you / whoever edits this):
// - Palette pulls straight from the hero: red #C41E2A, gold #F5B301,
//   green #1B7A43, plus a warm paper cream (#FFF3D6) for the menu surface
//   and an ink charcoal (#241C15) for body text.
// - Display type: Anton (bold condensed, matches the hero's "TAQUERÍA 777").
//   Body/price type: Inter.
// - Signature element: each menu item uses a dot-leader price line, like a
//   taco-stand menu board or a paper order ticket — not a generic card grid.
// - Swap <img> for next/image in the real project; left as <img> here so the
//   component has no build-time dependency on image assets.
// ---------------------------------------------------------------------------

type CategoryId = 'tacos' | 'especialidades' | 'quesadillas' | 'bebidas' | 'extras';

interface Category {
  id: CategoryId;
  label: string;
}

interface MenuItem {
  name: string;
  desc: string;
  price: number;
  badge?: string;
}

const CATEGORIES: Category[] = [
  { id: 'tacos', label: 'Tacos' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'quesadillas', label: 'Quesadillas' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'extras', label: 'Extras' },
];

const MENU: Record<CategoryId, MenuItem[]> = {
  tacos: [
    { name: 'Taco de asada', desc: 'Res asada, cebolla, cilantro', price: 28 },
    { name: 'Taco de adobada', desc: 'Al pastor, piña, cebolla, cilantro', price: 26 },
    {
      name: 'Taco de pescado',
      desc: 'Pescado capeado estilo Ensenada, col, salsa blanca',
      price: 32,
      badge: 'Especialidad de la casa',
    },
    { name: 'Taco de camarón', desc: 'Camarón a la plancha, chile toreado', price: 34 },
    { name: 'Taco de lengua', desc: 'Lengua de res, salsa verde', price: 30 },
  ],
  especialidades: [
    { name: 'Mulita', desc: 'Doble tortilla, queso, carne de tu elección', price: 45 },
    { name: 'Vampiro', desc: 'Tortilla crujiente, queso gratinado, adobada', price: 42 },
    { name: 'Gringa', desc: 'Tortilla de harina, queso, pastor', price: 44 },
    { name: 'Trompo especial 777', desc: 'Pastor, piña asada, queso, papa', price: 55 },
  ],
  quesadillas: [
    { name: 'Quesadilla sencilla', desc: 'Queso oaxaca', price: 30 },
    { name: 'Quesadilla de asada', desc: 'Queso oaxaca, res asada', price: 40 },
    { name: 'Quesadilla de camarón', desc: 'Queso oaxaca, camarón, chile toreado', price: 48 },
  ],
  bebidas: [
    { name: 'Agua de horchata', desc: '16 oz', price: 20 },
    { name: 'Agua de jamaica', desc: '16 oz', price: 20 },
    { name: 'Refresco', desc: 'Lata 355 ml', price: 18 },
    { name: 'Cerveza', desc: 'Consultar variedades', price: 35 },
  ],
  extras: [
    { name: 'Papas con todo', desc: 'Queso, crema, pico de gallo', price: 38 },
    { name: 'Guacamole', desc: 'Con totopos', price: 32 },
    { name: 'Frijoles de la olla', desc: 'Porción individual', price: 15 },
  ],
};

function formatPrice(n: number): string {
  return `$${n}`;
}

export default function MenuSection() {
  const [active, setActive] = useState<CategoryId>('tacos');
  const items = MENU[active];

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

      {/* Torn-edge top border, like a menu board taped to the wall */}
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
          <p
            className="menu-body text-sm font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: '#C41E2A' }}
          >
            Ensenada, B.C.
          </p>
          <h2
            className="menu-display text-5xl sm:text-6xl uppercase leading-none"
            style={{ color: '#241C15' }}
          >
            El Menú
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
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
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu items — dot-leader ticket style */}
        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li key={item.name} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span
                  className="menu-display text-xl sm:text-2xl uppercase shrink-0"
                  style={{ color: '#241C15' }}
                >
                  {item.name}
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
                  {formatPrice(item.price)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="menu-body text-sm" style={{ color: '#241C15', opacity: 0.7 }}>
                  {item.desc}
                </p>
                {item.badge && (
                  <span
                    className="menu-body text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#1B7A43', color: '#FFF3D6' }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
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