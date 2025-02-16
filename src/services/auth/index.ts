import axiosInstance from '@/axios-settings';
import { setCookies } from '@/utils';

import { ILoginBody, ITokenResponse } from './types';

class AuthService {
  static async login(body: ILoginBody) {
    try {
      const { data } = await axiosInstance.post<ITokenResponse>(
        '/auth/login',
        body,
      );

      setCookies(data);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
