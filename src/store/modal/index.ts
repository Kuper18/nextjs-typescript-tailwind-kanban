import { create } from 'zustand';

import { IAlertPopupStore } from './types';

export const useAlertStore = create<IAlertPopupStore>((set) => ({
  isOpen: false,
  description: '',
  title: '',
  isPending: false,
  onConfirm: () => {},
  toggleOpen: (value) => set((state) => ({ isOpen: value ?? !state.isOpen })),
  setAlertData: ({
    description,
    title,
    onConfirm,
  }) => set({
    description, onConfirm, title,
  }),
}));
