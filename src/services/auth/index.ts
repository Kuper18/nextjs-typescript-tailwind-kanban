import axiosInstance from '@/axios-settings';
import { ILoginBody, ITokenResponse } from './types';
import { setCookies } from '@/utils';

class AuthService {
  async login(body: ILoginBody) {
    try {
      const { data } = await axiosInstance.post<ITokenResponse>('/auth/login', body);

      setCookies(data);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const authApi = new AuthService();

export default authApi;
