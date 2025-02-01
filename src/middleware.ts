import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { Token } from './enums/token';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(Token.ACCESS);
  const pathName = req.nextUrl.pathname;
  const isAuthRoute = pathName === '/login' || pathName === '/signup';

  if (accessToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(accessToken.value, secret);

      if (isAuthRoute) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', req.url));

      response.cookies.set(Token.ACCESS, '', {
        expires: new Date(0),
        path: '/',
      });
      response.cookies.set(Token.REFRESH, '', {
        expires: new Date(0),
        path: '/',
      });

      console.error('Invalid token:', error);
      return response;
    }
  }

  if (!accessToken && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup'],
};
