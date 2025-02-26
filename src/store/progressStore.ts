import { create } from "zustand";

export interface NextProgressFormData {
  completeAt: string;
  startAt: string;
  nextGradeId: string;
}

interface NextProgressFormStore {
  formData: NextProgressFormData;
  setFormData: (data: NextProgressFormData) => void;
  updateFormData: (key: keyof NextProgressFormData, value: string) => void;
  resetFormData: () => void;
}

const useProgressFormStore = create<NextProgressFormStore>((set) => ({
  formData: { completeAt: "", startAt: "", nextGradeId: "" },
  setFormData: (data) => set({ formData: data }),
  updateFormData: (key, value) =>
    set((state) => ({ formData: { ...state.formData, [key]: value } })),
  resetFormData: () =>
    set({ formData: { completeAt: "", startAt: "", nextGradeId: "" } }),
}));

export default useProgressFormStore;
