import { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  buttonProps?: {
    text: string;
    color: string;
  };
  openModal: (
    content: ReactNode,
    buttonProps: {
      text: string;
      color: string;
    },
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
  openModal: (
    content,
    buttonProps,
    action = () => {},
    closeAction = () => {}
  ) => set({ isOpen: true, content, buttonProps, action, closeAction }),
  closeAction: (closeAction = () => {}) => set({ closeAction }),
  closeModal: () => set({ isOpen: false, content: null }),
}));

export default useModalStore;
