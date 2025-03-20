import React from 'react';

import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import ColumnList from '@/components/templates/ColumnList';
import MainLayout from '@/components/templates/MainLayout';
import DndProvider from '@/providers/dnd-provider';

const ColumnPage = () => {
  return (
    <MainLayout>
      <ScrollArea className="w-full">
        <ScrollBar orientation="horizontal" />
        <DndProvider>
          <ColumnList />
        </DndProvider>
      </ScrollArea>
    </MainLayout>
  );
};

export default ColumnPage;
