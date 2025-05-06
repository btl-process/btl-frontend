import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldsCaseSchema } from "@/schemas/fields-case.schema";
import { z } from "zod";

export function useFieldsCaseForm() {
  const form = useForm<z.infer<typeof fieldsCaseSchema>>({
    resolver: zodResolver(fieldsCaseSchema),
    defaultValues: {
        name: "",
        nit: "",
        mail: "",
        accidentDate: undefined,
        accidentPlace: "",
        cityAndDepartment: "",
        numberPlateFirstInvolved: "",
        nameFirstInvolved: "",
        numberPlateSecondInvolved: "",
        nameSecondInvolved: "",
        driverVehicle: "",
        idDriverVehicle: "",
        amount: 0,
        insurancePolicy: "",
    },
  });

  const onSubmit = (values: z.infer<typeof fieldsCaseSchema>) => {
    console.log("Fields Case values:", values);
    // Aquí puedes hacer llamada a API, redirección, etc.
  };

  return {
    form,
    onSubmit,
  };
}
