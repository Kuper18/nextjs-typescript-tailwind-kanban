import { create } from 'zustand';

import { IBoardToUpdateStore } from './types';

const useBoardToUpdateStore = create<IBoardToUpdateStore>((set) => ({
  board: null,
  isOpenModal: false,
  triggerOpenModal: (value) => set((state) => ({ isOpenModal: value ?? !state.isOpenModal })),
  setBoardToUpdate: (board) => set({ board }),
  resetBoardToUpdate: () => set({ board: null }),
}));

export default useBoardToUpdateStore;
