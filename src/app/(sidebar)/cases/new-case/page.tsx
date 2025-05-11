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
import { useState } from "react";

const steps = ["Completar caso", "Anexar evidencias", "Previsualizar caso"];

export default function NewCasePage() {
  const searchParams = useSearchParams();
  const caseType = searchParams.get("caseType");
  const { form, onSubmit } = useFieldsCaseForm();
  const [step, setStep] = useState(1);

  if (!caseType || !["RCE-DANOS", "RCE-HURTO"].includes(caseType)) {
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

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex flex-1 flex-col px-4 py-6 gap-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          {steps.map((label, index) => {
            const isActive = index + 1 === step;
            const isCompleted = index + 1 < step;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-[#182A76] border-[#182A76] text-white"
                      : "border-gray-300 text-gray-500"
                  }
                `}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span className="mt-2 text-sm text-center">{label}</span>
                {index < steps.length - 1 && (
                  <div className="absolute top-4 left-full w-full h-0.5 bg-gray-300 z-[-1]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
                      <FormLabel>Propietario 2do vehículo</FormLabel>
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

          <div className="sticky top-0 col-span-2 h-[500px]">
            <h2 className="font-semibold text-2xl mb-2">Editor</h2>
            <Tiptap caseType={caseType} />
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                onClick={nextStep}
                className="bg-black hover:bg-black/90 text-white mt-2"
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Paso 2 (por implementar)</h2>
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="secondary">
              Atrás
            </Button>
            <Button onClick={nextStep}>Siguiente</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Paso 3 (por implementar)</h2>
          <div className="flex gap-4">
            <Button onClick={prevStep} variant="secondary">
              Atrás
            </Button>
            <Button type="submit" className="bg-[#182A76] text-white">
              Finalizar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
