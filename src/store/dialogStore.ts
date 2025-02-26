import { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (
    content: ReactNode,
    action?: () => void,
    closeAction?: () => void
  ) => void;
  closeModal: () => void;
  action: () => void;
  closeAction: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  action: (action = () => {}) => set({ action }),
  closeAction: (closeAction = () => {}) => set({ closeAction }),
  openModal: (content, action = () => {}, closeAction = () => {}) =>
    set({ isOpen: true, content, action, closeAction }),
  closeModal: () => set({ isOpen: false, content: null }),
}));

export default useModalStore;
