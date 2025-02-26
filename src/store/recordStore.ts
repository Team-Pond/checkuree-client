// src/store/useFormDataStore.ts

import { create } from "zustand";

interface FormData {
  hour: string;
  minute: string;
}

interface FormDataStore {
  formData: FormData;
  setFormData: (data: FormData) => void;
  updateFormData: (key: "hour" | "minute", value: string) => void;
  resetFormData: () => void;
}

const useFormDataStore = create<FormDataStore>((set) => ({
  formData: { hour: "", minute: "" },
  setFormData: (data: FormData) => set({ formData: data }),
  updateFormData: (key, value) =>
    set((state) => ({ formData: { ...state.formData, [key]: value } })),
  resetFormData: () => set({ formData: { hour: "", minute: "" } }),
}));

export default useFormDataStore;
