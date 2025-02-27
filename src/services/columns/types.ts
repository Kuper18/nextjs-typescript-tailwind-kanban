export interface IColumnBody {
  name: string;
  boardId: number;
}

export interface IColumn extends Omit<IColumnBody, 'boardId'> {
  id: number;
}
