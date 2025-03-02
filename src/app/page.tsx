import React from 'react';

import MainLayout from '@/components/templates/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <h3 className="text-heading-l text-secondary-foreground">Please Select a Board</h3>
      </div>
    </MainLayout>
  );
};

export default Home;
