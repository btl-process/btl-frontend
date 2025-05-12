import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fieldsCaseSchema } from "@/schemas/fields-case.schema";
import { useCaseFormStore } from "@/hooks/use-case-form-store";

export const useFieldsCaseForm = () => {
  const { updateFormData } = useCaseFormStore();
  
  const form = useForm({
    resolver: zodResolver(fieldsCaseSchema),
    defaultValues: {
      name: "",
      nit: "",
      mail: "",
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
    updateFormData(values);
    // Aquí puedes agregar lógica adicional como enviar al servidor
    console.log(values);
  };

  return { form, onSubmit };
};
