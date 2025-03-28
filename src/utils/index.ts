import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { Token } from '@/enums/token';
import { ITokenResponse } from '@/services/auth/types';
import { TNotificationType } from '@/types';

export const setCookies = ({
  access_token,
  refresh_token,
}: ITokenResponse): void => {
  const COOKIE_CONFIG = {
    expires: 90,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  } as const;

  Cookies.set(Token.ACCESS, access_token, COOKIE_CONFIG);
  Cookies.set(Token.REFRESH, refresh_token, COOKIE_CONFIG);
};

export const removeCookies = (): void => {
  Cookies.remove(Token.ACCESS, { path: '/' });
  Cookies.remove(Token.REFRESH, { path: '/' });
};

export const generateRandomColor = (): string => {
  const red = getRandomIntInclusive(0, 255);
  const green = getRandomIntInclusive(0, 255);
  const blue = getRandomIntInclusive(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const showNotification = (type: TNotificationType, message: string) => {
  toast[type](message, {
    closeButton: true,
  });
};

export const handleErrorResponse = (error: AxiosError) => {
  const data = error.response?.data as { message: string };
  showNotification('error', data.message);
};
