import React from 'react';

import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import ColumnList from '@/components/templates/ColumnList';
import MainLayout from '@/components/templates/MainLayout';

const ColumnPage = () => {
  return (
    <MainLayout>
      <ScrollArea className="w-full">
        <ScrollBar orientation="horizontal" />
        <ColumnList />
      </ScrollArea>
    </MainLayout>
  );
};

export default ColumnPage;
