import axiosInstance from '@/axios-settings';

import { ITask } from './types';

class TasksService {
  static async get(columnId: number) {
    try {
      const { data } = await axiosInstance.get<ITask[]>(`/tasks/${columnId}`);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default TasksService;
