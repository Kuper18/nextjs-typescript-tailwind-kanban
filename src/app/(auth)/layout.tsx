import AuthTemplate from '@/components/templates/AuthTemplate';
import React from 'react';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <AuthTemplate>{children}</AuthTemplate>;
};

export default AuthLayout;
