import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/schemas/auth.schema";
import { z } from "zod";

export function useLoginForm() {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    console.log("Login values:", values);
    // Aquí puedes hacer llamada a API, redirección, etc.
  };

  return {
    form,
    onSubmit,
  };
}
