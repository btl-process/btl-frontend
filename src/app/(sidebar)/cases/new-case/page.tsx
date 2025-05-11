"use client";

import { useSearchParams } from "next/navigation";
import { useFieldsCaseForm } from "@/hooks/use-fields-case-form";
import { useState } from "react";
import StepOne from "@/components/add-case/step-one";
import StepTwo from "@/components/add-case/step-two";
import StepThree from "@/components/add-case/step-three";

const steps = ["Añadir información", "Anexar evidencias", "Previsualizar caso"];

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
                      ? "bg-green-700 border-green-700 text-white"
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
        <StepOne
          form={form}
          onSubmit={onSubmit}
          caseType={caseType}
          nextStep={nextStep}
        />
      )}

      {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} />}

      {step === 3 && <StepThree nextStep={nextStep} prevStep={prevStep} />}
    </div>
  );
}
