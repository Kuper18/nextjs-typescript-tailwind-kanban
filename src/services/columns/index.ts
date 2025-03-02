import axiosInstance from '@/axios-settings';

import { IColumn, IColumnBody, IColumnWithRelations } from './types';

class ColumnsService {
  static async get(boardId: string) {
    try {
      const { data } = await axiosInstance.get<IColumnWithRelations[]>(`/columns/${boardId}`);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async post(body: IColumnBody) {
    try {
      const { data } = await axiosInstance.post<IColumn>('/columns', body);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ColumnsService;
