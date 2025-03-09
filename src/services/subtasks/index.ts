import axiosInstance from '@/axios-settings';

import { ISubtask, ISubtaskBody, ISubtaskBodyToUpdate } from './types';

class SubtasksService {
  static async post(body: ISubtaskBody) {
    try {
      const { data } = await axiosInstance.post<ISubtask[]>('/subtasks', body);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async patch(body: ISubtaskBodyToUpdate) {
    try {
      const { data } = await axiosInstance.patch<ISubtask>('/subtasks', body);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default SubtasksService;
