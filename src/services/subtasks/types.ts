export interface ISubtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface ISubtaskToCreate {
  title: string;
  taskId: number;
}

export interface ISubtaskBody {
  subtasks: ISubtaskToCreate[];
}

export interface ISubtaskBodyToUpdate {
  title?: string;
  isCompleted?: boolean;
  subtaskId: number;
}
