import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCaseSchema } from "@/schemas/create-case.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCaseFormStore } from "./use-case-form-store";

export function useCreateCaseForm() {
  const router = useRouter();
  const { formData } = useCaseFormStore();

  const form = useForm<z.infer<typeof createCaseSchema>>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
      caseType: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createCaseSchema>) => {
    console.log("Create Case values:", values);
    // Aquí puedes hacer llamada a API, redirección, etc.
    formData.name = "";
    formData.nit = "";
    formData.mail = "";
    formData.accidentDate = undefined;
    formData.accidentPlace = "";
    formData.cityAndDepartment = "";
    formData.numberPlateFirstInvolved = "";
    formData.nameFirstInvolved = "";
    formData.numberPlateSecondInvolved = "";
    formData.nameSecondInvolved = "";
    formData.driverVehicle = "";
    formData.idDriverVehicle = "";
    formData.amount = 0;
    formData.insurancePolicy = "";
    router.push(
      `/cases/new-case?caseType=${encodeURIComponent(values.caseType)}`
    );
  };

  return {
    form,
    onSubmit,
  };
}
