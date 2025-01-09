import AuthTemplate from '@/components/templates/AuthTemplate';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    redirect('/');
  }

  return <AuthTemplate>{children}</AuthTemplate>;
};

export default AuthLayout;
