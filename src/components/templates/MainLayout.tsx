import React from 'react';
import { SidebarProvider, SidebarTrigger } from '../atoms/sidebar';
import AsideMenu from '../organisms/AsideMenu';
import Header from '../organisms/Header';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AsideMenu />
      <main className="mt-24 w-full bg-primary">
        <SidebarTrigger className="fixed bottom-8 left-0 w-14 rounded-l-none bg-accent px-0 pr-3 text-primary-foreground hover:bg-accent-hover" />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
