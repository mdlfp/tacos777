// lib/schemas/contacto.ts

import { z } from "zod";

export const contactoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, "Tu nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo"),

  telefono: z
    .string()
    .trim()
    .min(1, "Tu teléfono es requerido")
    .regex(
      /^[\d\s()+-]{10,15}$/,
      "Ingresa un teléfono válido (10 dígitos)"
    ),

  mensaje: z
    .string()
    .trim()
    .min(1, "Cuéntanos qué necesitas")
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje es demasiado largo (máximo 500 caracteres)"),
});

export type ContactoFormData = z.infer<typeof contactoSchema>;