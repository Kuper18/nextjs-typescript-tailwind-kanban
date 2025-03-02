import React, { Usable } from 'react';

import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import ColumnList from '@/components/templates/ColumnList';
import MainLayout from '@/components/templates/MainLayout';

type Props = {
  params: Usable<{ boardId: string }>;
};

const ColumnPage = ({ params }: Props) => {
  return (
    <MainLayout>
      <ScrollArea className="w-full">
        <ScrollBar orientation="horizontal" />
        <ColumnList params={params} />
      </ScrollArea>
    </MainLayout>
  );
};

export default ColumnPage;
