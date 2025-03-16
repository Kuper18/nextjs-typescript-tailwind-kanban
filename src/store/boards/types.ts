import { IBoard } from '@/services/boards/types';
import { IColumn } from '@/services/columns/types';

export interface IBoardToUpdate extends IBoard {
  columns: IColumn[];
}

export interface IBoardToUpdateStore {
  board: IBoardToUpdate | null;
  isOpenModal: boolean;
  triggerOpenModal: (value?: boolean) => void;
  setBoardToUpdate: (board: IBoardToUpdate) => void;
  resetBoardToUpdate: () => void;
}
