import { z } from "zod";

export const createCaseSchema = z.object({
    caseType: z.enum([
        "",
        "RCE-DAÑOS",
        "RCE-HURTO",
    ])
})