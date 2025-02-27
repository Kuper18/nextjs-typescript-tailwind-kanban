export interface IBoard {
  id: number;
  name: string;
}

export interface IBoardBody extends Omit<IBoard, 'id'> {}
