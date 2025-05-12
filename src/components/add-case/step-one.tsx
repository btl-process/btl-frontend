import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { fieldsCaseSchema } from "@/schemas/fields-case.schema";
import { TypeOf } from "zod";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Tiptap from "@/components/tiptap-editor";
import { Input } from "../ui/input";
import { useCaseFormStore } from "@/hooks/use-case-form-store";
import { useEffect } from "react";

export default function StepOne(
    {
        form,
        onSubmit,
        caseType,
        nextStep,
        }: {
        form: UseFormReturn<TypeOf<typeof fieldsCaseSchema>>;
        onSubmit: (data: TypeOf<typeof fieldsCaseSchema>) => void;
        caseType: string;
        nextStep: () => void;
    }
) {
  // Connect to Zustand store
  const { updateFormData, formData } = useCaseFormStore();

  // Modified onSubmit handler to save to Zustand store
  const handleSubmit = (data: TypeOf<typeof fieldsCaseSchema>) => {
    updateFormData(data);
    onSubmit(data);
  };

  // Pre-fill form with data from store when component mounts
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      Object.entries(formData).forEach(([key, value]) => {
        form.setValue(key as keyof TypeOf<typeof fieldsCaseSchema>, value);
      });
    }
  }, [form, formData]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 col-span-1 md:col-span-1"
        >
          <h2 className="font-semibold text-2xl">Campos requeridos</h2>
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombre o Razón Social</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ej: Juan S.A.S."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nit</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789-0" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="juan@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accidentDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Fecha Accidente</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "PPP", { locale: es })
                          : "Selecciona una fecha"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accidentPlace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección de lo sucedido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Calle 123 # 45-67"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cityAndDepartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad, Departamento de lo sucedido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cali, Valle del Cauca"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="numberPlateFirstInvolved"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Placas 1er implicado</FormLabel>
                  <FormControl>
                    <Input placeholder="UGR908" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameFirstInvolved"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Propietario 1er vehículo</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="numberPlateSecondInvolved"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Placas 2do implicado</FormLabel>
                  <FormControl>
                    <Input placeholder="KUY497" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameSecondInvolved"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Propietario 2do vehículo</FormLabel>
                  <FormControl>
                    <Input placeholder="María López" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="driverVehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conductor vehículo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Fernando Pérez García"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idDriverVehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CC conductor</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuantías</FormLabel>
                <FormControl>
                  <Input placeholder="1000000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insurancePolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poliza del asegurado</FormLabel>
                <FormControl>
                  <Input placeholder="AUW1234567890" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#182A76] hover:bg-[#182A76]/90 hover:cursor-pointer"
          >
            Guardar
          </Button>
        </form>
      </Form>

      <div className="sticky top-0 col-span-2 h-[500px]">
        <h2 className="font-semibold text-2xl mb-2">Editor</h2>
        <Tiptap caseType={caseType} />
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            onClick={nextStep}
            className="bg-black hover:bg-black/90 text-white mt-2 hover:cursor-pointer"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
