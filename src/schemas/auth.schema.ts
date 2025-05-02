import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El usuario es obligatorio" })
    .email({ message: "Formato de email inválido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
