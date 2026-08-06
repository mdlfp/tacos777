// lib/contacto.ts

import type { ContactoFormData } from "@/app/lib/schemas/contacto";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export class ContactoSubmitError extends Error {}

export async function enviarMensajeContacto(
  input: ContactoFormData
): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/mensaje-contactos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: input }),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.error?.message ?? "";
    } catch {
      // sin body legible, seguimos con detail vacío
    }
    throw new ContactoSubmitError(
      detail || "No se pudo enviar el mensaje. Intenta de nuevo."
    );
  }
}