import axiosInstance from '@/axios-settings';

import { ITask, ITaskBody, ITaskBodyUpdate } from './types';

class TasksService {
  static async get(columnId: number) {
    try {
      const { data } = await axiosInstance.get<ITask[]>(`/tasks/${columnId}`);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async post(body: ITaskBody) {
    try {
      const { data } = await axiosInstance.post<ITask>('/tasks', body);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async put(body: ITaskBodyUpdate) {
    try {
      const { data } = await axiosInstance.put<ITask>('/tasks', body);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(taskId: number) {
    try {
      const { data } = await axiosInstance.delete<{ message: string }>(
        `/tasks/${taskId}`,
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default TasksService;
