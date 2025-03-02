export interface ITask {
  id: number;
  title: string;
  description: string | null;
}

export interface ITaskBody extends Omit<ITask, 'id'> {
  columnId: number;
}
