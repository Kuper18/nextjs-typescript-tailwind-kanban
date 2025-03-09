import { create } from 'zustand';

import { ITaskToUpdateStore } from './types';

const useTaskToUpdateStore = create<ITaskToUpdateStore>((set) => ({
  task: null,
  isOpenModal: false,
  triggerOpenModal: (value) => set((state) => ({ isOpenModal: value ?? !state.isOpenModal })),
  setTaskToUpdate: (task) => set({ task }),
  resetTaskToUpdate: () => set({ task: null }),
}));

export default useTaskToUpdateStore;
