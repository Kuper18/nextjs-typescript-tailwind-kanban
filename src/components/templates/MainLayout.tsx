import React from 'react';
import { SidebarProvider, SidebarTrigger } from '../atoms/sidebar';
import AsideMenu from '../organisms/AsideMenu';
import Header from '../organisms/Header';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AsideMenu />
      <main className="mt-16 w-full bg-primary sm:mt-[81px] lg:mt-24">
        <SidebarTrigger className="fixed bottom-8 left-0 hidden w-14 rounded-l-none bg-accent px-0 pr-3 text-primary-foreground hover:bg-accent-hover sm:flex" />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
