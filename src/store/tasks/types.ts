import { ISubtask } from '@/services/subtasks/types';
import { ITask } from '@/services/tasks/types';

export interface ITaskToUpdate extends ITask {
  status: number;
  subtasks: ISubtask[];
}

export interface ITaskToUpdateStore {
  task: ITaskToUpdate | null;
  isOpenModal: boolean
  triggerOpenModal: (value?: boolean) => void
  setTaskToUpdate: (task: ITaskToUpdate) => void;
  resetTaskToUpdate: () => void;
}
