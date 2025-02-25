import { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode, action?: () => void) => void;
  closeModal: () => void;
  action: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  action: () => {},
  openModal: (content, action = () => {}) =>
    set({ isOpen: true, content, action }),
  closeModal: () => set({ isOpen: false, content: null }),
}));

export default useModalStore;
