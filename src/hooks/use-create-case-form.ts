import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCaseSchema } from "@/schemas/create-case.schema";
import { z } from "zod";

export function useCreateCaseForm() {
  const form = useForm<z.infer<typeof createCaseSchema>>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
        caseType: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createCaseSchema>) => {
    console.log("Create Case values:", values);
    // Aquí puedes hacer llamada a API, redirección, etc.
  };

  return {
    form,
    onSubmit,
  };
}
