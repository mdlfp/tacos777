// app/api/revalidate/route.ts

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

// Mapea el "model" (uid del content-type en Strapi) al tag de Next.js que hay que invalidar.
const MODEL_TO_TAG: Record<string, string> = {
  "home-page": "home-page",
  "site-config": "site-config",
  product: "home-page", // los productos viven dentro del menú de home-page
  "product-category": "home-page",
  sucursal: "home-page", // las sucursales viven dentro de home-page
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  let body: { model?: string; event?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Body inválido" }, { status: 400 });
  }

  const model = body.model;
  const tag = model ? MODEL_TO_TAG[model] : undefined;

  if (!tag) {
    return NextResponse.json(
      { message: `Modelo "${model}" no mapeado, nada que revalidar` },
      { status: 200 }
    );
  }

  revalidateTag(tag, {expire: 0});

  return NextResponse.json({
    revalidated: true,
    tag,
    model,
    event: body.event,
    now: Date.now(),
  });
}