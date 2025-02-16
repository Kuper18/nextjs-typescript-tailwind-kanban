import axiosInstance from '@/axios-settings';

import { IBoard } from './types';

class BoardsService {
  static async get() {
    try {
      const { data } = await axiosInstance.get<IBoard[]>('/boards');

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default BoardsService;
