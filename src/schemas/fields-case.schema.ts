import { z } from "zod";

export const fieldsCaseSchema = z.object({
    name: z.string().min(1, { message: "El nombre o razon social es obligatorio" }),
    nit: z.string().min(1, { message: "El NIT es obligatorio" }),
    mail: z.string().email({ message: "El correo electrónico no es válido" }),
    accidentDate: z.date().refine((date) => date <= new Date(), {
        message: "La fecha del accidente no puede ser futura",
    }),
    accidentPlace: z.string().min(1, { message: "El lugar del accidente es obligatorio" }),
    cityAndDepartment: z.string().min(1, { message: "La ciudad y departamento son obligatorios" }),
    numberPlateFirstInvolved: z.string().min(1, { message: "La placa del primer involucrado es obligatoria" }),
    nameFirstInvolved: z.string().min(1, { message: "El nombre del primer involucrado es obligatorio" }),
    numberPlateSecondInvolved: z.string().optional(),
    nameSecondInvolved: z.string().optional(),
    driverVehicle: z.string().min(1, { message: "El nombre del conductor es obligatorio" }),
    idDriverVehicle: z.string().min(1, { message: "El número de identificación del conductor del primer involucrado es obligatorio" }),
    amount: z.number().min(1, { message: "El monto es obligatorio" }),
    insurancePolicy: z.string().min(1, { message: "La póliza de seguro es obligatoria" }),
})

// export const fieldsCaseSchema = z.object({
//     name: z.string(),
//     nit: z.string(),
//     mail: z.string(),
//     accidentDate: z.string(),
//     accidentPlace: z.string(),
//     cityAndDepartment: z.string(),
//     numberPlateFirstInvolved: z.string(),
//     nameFirstInvolved: z.string(),
//     numberPlateSecondInvolved: z.string().optional(),
//     nameSecondInvolved: z.string().optional(),
//     driverVehicle: z.string(),
//     idDriverVehicle: z.string(),
//     amount: z.number(),
//     insurancePolicy: z.string(),
// });