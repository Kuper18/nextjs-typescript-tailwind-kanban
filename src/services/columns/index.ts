import axiosInstance from '@/axios-settings';

import {
  IColumn,
  IColumnBody,
  IColumnBodyToUpdate,
  IColumnWithRelations,
} from './types';

class ColumnsService {
  static async get(boardId: string) {
    try {
      const { data } = await axiosInstance.get<IColumnWithRelations[]>(
        `/columns/${boardId}?populate=tasks,subtasks`,
      );

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

  static async put(body: IColumnBodyToUpdate) {
    try {
      const { data } = await axiosInstance.put<IColumn>('/columns', body);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string | number) {
    try {
      const { data } = await axiosInstance.delete<{ message: string }>(`/columns/${id}`);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ColumnsService;
