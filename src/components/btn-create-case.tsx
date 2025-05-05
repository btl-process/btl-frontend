import { PlusCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { useCreateCaseForm } from "@/hooks/use-create-case-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function BtnCreateCase({
  btnClassName,
}: {
  btnClassName?: string;
}) {
  const { form, onSubmit } = useCreateCaseForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={`bg-[#182A76] hover:bg-[#182A76]/90 hover:cursor-pointer ${btnClassName}`}
        >
          <PlusCircleIcon />
          <span>Añadir caso</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo caso</DialogTitle>
          <DialogDescription>
            Seleccione el tipo de caso que desea crear.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="caseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de caso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un caso para empezar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RCE-DAÑOS">
                        Reclamación RCE Daños
                      </SelectItem>
                      <SelectItem value="RCE-HURTO">
                        Reaclamación RCE Hurto
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="hover:cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-[#182A76] hover:bg-[#182A76]/90 hover:cursor-pointer"
              >
                Confirmar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
