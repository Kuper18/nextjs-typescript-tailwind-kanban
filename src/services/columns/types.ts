export interface IColumnBody {
  name: string;
  boardId: number;
}

export interface IColumn extends Omit<IColumnBody, 'boardId'> {
  id: number;
}

export interface IColumnWithRelations extends IColumn {
  tasks: {
    id: number;
    title: string;
    description: string | null;
    subtasks: {
      id: number;
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}

export interface IColumnBodyToUpdate {
  name: string;
  columnId: number;
}
