import { Button } from "../ui/button";

export default function StepTwo(
    {
        nextStep,
        prevStep
    } : {
        nextStep: () => void,
        prevStep: () => void
    }
) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Paso 2 (por implementar)</h2>
      <div className="flex gap-4">
        <Button onClick={prevStep} variant="secondary">
          Atrás
        </Button>
        <Button onClick={nextStep}>Siguiente</Button>
      </div>
    </div>
  );
}
