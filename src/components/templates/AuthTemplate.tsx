import React from 'react';

import AuthHeader from '../organisms/AuthHeader';

const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <main className="flex h-[calc(100vh-64px)] items-center justify-center bg-primary px-5 sm:h-[calc(100vh-81px)] lg:h-[calc(100vh-96px)]">
        {children}
      </main>
    </>
  );
};

export default AuthTemplate;
