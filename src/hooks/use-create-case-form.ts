import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCaseSchema } from "@/schemas/create-case.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";

export function useCreateCaseForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof createCaseSchema>>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
        caseType: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createCaseSchema>) => {
    console.log("Create Case values:", values);
    // Aquí puedes hacer llamada a API, redirección, etc.
    router.push(`/cases/new-case?caseType=${encodeURIComponent(values.caseType)}`);
  };

  return {
    form,
    onSubmit,
  };
}
