import axiosInstance from '@/axios-settings';

import { IBoard, IBoardBody, IBoardBodyToUpdate } from './types';

class BoardsService {
  static async get() {
    try {
      const { data } = await axiosInstance.get<IBoard[]>('/boards');

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async post(body: IBoardBody) {
    try {
      const { data } = await axiosInstance.post<IBoard>('/boards', body);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async put(body: IBoardBodyToUpdate) {
    try {
      const { data } = await axiosInstance.put<IBoard>('/boards', body);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default BoardsService;
