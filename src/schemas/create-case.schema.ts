import { z } from "zod";

export const createCaseSchema = z.object({
    caseType: z.enum([
        "RCE-DAÑOS",
        "RCE-HURTO",
    ], {
        required_error: "El tipo de caso es obligatorio",
        invalid_type_error: "El tipo de caso debe ser uno de los valores permitidos"
    })
})