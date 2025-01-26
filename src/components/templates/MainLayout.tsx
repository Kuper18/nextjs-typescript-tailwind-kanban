import React from 'react';
import { SidebarProvider, SidebarTrigger } from '../atoms/sidebar';
import AsideMenu from '../organisms/AsideMenu';
import Header from '../organisms/Header';
import CardTask from '../molecules/CardTask';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AsideMenu />
      <main className="mt-16 w-full bg-primary px-[16px] py-6 sm:mt-[81px] sm:px-6 lg:mt-24">
        <SidebarTrigger className="fixed bottom-8 left-0 hidden w-14 rounded-l-none bg-accent px-0 pr-3 text-primary-foreground hover:bg-accent-hover sm:flex" />
        <CardTask />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
