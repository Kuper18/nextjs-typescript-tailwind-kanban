import React from 'react';

import { ScrollArea, ScrollBar } from '../atoms/scroll-area';
import { SidebarProvider, SidebarTrigger } from '../atoms/sidebar';
import AsideMenu from '../organisms/AsideMenu';
import Header from '../organisms/Header';

import ColumnList from './ColumnList';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AsideMenu />
      <div className="h-screen overflow-hidden bg-primary px-[16px] py-6 sm:px-6">
        <main className="mt-16 sm:mt-[81px] lg:mt-24">
          <SidebarTrigger className="fixed bottom-8 left-0 hidden w-14 rounded-l-none bg-accent px-0 pr-3 text-primary-foreground hover:bg-accent-hover sm:flex" />
          <ScrollArea className="w-full">
            <ColumnList />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
