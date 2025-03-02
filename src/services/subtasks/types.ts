export interface ISubtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface ISubtaskBody {
  subtasks: { title: string; taskId: number }[];
}
