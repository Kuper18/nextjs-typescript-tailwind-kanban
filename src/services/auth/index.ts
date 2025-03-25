import axiosInstance from '@/axios-settings';
import { TSignupFormData } from '@/types';
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

  static async signup(body: TSignupFormData) {
    try {
      const { data } = await axiosInstance.post<ITokenResponse>(
        '/users/signup',
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
