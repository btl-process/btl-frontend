import { create } from 'zustand'
import { fieldsCaseSchema } from '@/schemas/fields-case.schema'
import { TypeOf } from 'zod'
import { persist } from 'zustand/middleware'

interface CaseFormState {
    formData: Partial<TypeOf<typeof fieldsCaseSchema>>
    step: number
    updateFormData: (data: Partial<TypeOf<typeof fieldsCaseSchema>>) => void
    setStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    resetForm: () => void
}

export const useCaseFormStore = create<CaseFormState>()(
    persist(
        (set) => ({
            formData: {},
            step: 1,
            updateFormData: (data) => 
                set((state) => ({ 
                    formData: { ...state.formData, ...data } 
                })),
            setStep: (step) => 
                set({ step }),
            nextStep: () => 
                set((state) => ({ step: Math.min(state.step + 1, 3) })),
            prevStep: () => 
                set((state) => ({ step: Math.max(state.step - 1, 1) })),
            resetForm: () => 
                set({ formData: {}, step: 1 }),
        }),
        {
            name: 'case-form-storage',
        }
    )
)
