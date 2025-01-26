import { ITokenResponse } from '@/services/auth/types';
import Cookies from 'js-cookie';

export const setCookies = ({
  access_token,
  refresh_token,
}: ITokenResponse): void => {
  const COOKIE_CONFIG = {
    expires: 30,
    path: '',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  } as const;

  Cookies.set('access_token', access_token, COOKIE_CONFIG);
  Cookies.set('refresh_token', refresh_token, COOKIE_CONFIG);
};

export const removeCookies = (): void => {
  Cookies.remove('access_token', { path: '' });
  Cookies.remove('refresh_token', { path: '' });
};
