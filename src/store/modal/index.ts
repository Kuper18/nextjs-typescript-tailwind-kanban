import { create } from 'zustand';

import { IOpenTaskModalStore } from './types';

export const useOpenTaskModalStore = create<IOpenTaskModalStore>((set) => ({
  isOpen: false,
  toggleOpen: (value) => set({ isOpen: value }),
}));
