import axiosInstance from '@/axios-settings';

import { IColumn, IColumnBody } from './types';

class ColumnsService {
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
