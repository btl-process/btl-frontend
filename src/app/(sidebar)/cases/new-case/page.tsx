"use client";

import { useSearchParams } from "next/navigation";
import { useFieldsCaseForm } from "@/hooks/use-fields-case-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { es } from "date-fns/locale";

export default function NewCasePage() {
  const searchParams = useSearchParams();
  const caseType = searchParams.get("caseType");
  const { form, onSubmit } = useFieldsCaseForm();

  // improve error handling for invalid case types and design a better UI
  if (!caseType || !["RCE-DAÑOS", "RCE-HURTO"].includes(caseType)) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4 md:gap-6 md:py-6 px-4">
        <h1>Nuevo caso</h1>
        <p className="text-red-500">
          Tipo de caso no válido o no seleccionado.
        </p>
        <p>Por favor, selecciona un tipo de caso válido.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
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
                          <Input
                            placeholder="123456789-0"
                            type="text"
                            {...field}
                          />
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
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", {locale: es}) // format the date to a readable format
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
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
                        <FormLabel>Propietario 1er vehiculo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Juan Pérez"
                            type="text"
                            {...field}
                          />
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
                        <FormLabel>Propietario 2do vehiculo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="María López"
                            type="text"
                            {...field}
                          />
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
                      <FormLabel>Conductor vehiculo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Juan Fernando Peréz García"
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
                        <Input
                          placeholder="1234567890"
                          type="number"
                          {...field}
                        />
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
                        <Input
                          placeholder="AUW1234567890"
                          type="text"
                          {...field}
                        />
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
            <div className="sticky top-0 h-10">
              <h2 className="font-semibold text-2xl">Editor</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
