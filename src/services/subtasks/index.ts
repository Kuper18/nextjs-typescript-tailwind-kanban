import axiosInstance from '@/axios-settings';

import { ISubtask, ISubtaskBody } from './types';

class SubtasksService {
  static async post(body: ISubtaskBody) {
    try {
      const { data } = await axiosInstance.post<ISubtask[]>('/subtasks', body);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default SubtasksService;
