'use client';

import { Plus } from 'lucide-react';
import React from 'react';

import useColumns from '@/hooks/columns/use-columns';

import { Button } from '../atoms/button';
import ColumnSkeleton from '../molecules/ColumnSkeleton';
import Column from '../organisms/Column';
import CreateColumnDialog from '../organisms/CreateColumnDialog';

const ColumnList = () => {
  const { data: columns, isPending } = useColumns();

  if (isPending) {
    return <ColumnSkeleton />;
  }

  return columns?.length ? (
    <div className="flex h-[calc(100vh-134px)] space-x-6">
      {columns?.map((item) => <Column key={item.id} {...item} />)}

      <CreateColumnDialog>
        <Button
          variant="primary"
          className="mt-[40px] h-[calc(100%-60px)] w-[280px] rounded-lg"
        >
          + New Column
        </Button>
      </CreateColumnDialog>
    </div>
  ) : (
    <div className="flex h-screen flex-col items-center justify-center space-y-8">
      <h3 className="text-center text-heading-l text-secondary-foreground">
        This board is empty. Create a new column to get started.
      </h3>

      <CreateColumnDialog>
        <Button size="lg" className="w-[174px]">
          <Plus className="h-3 w-3" />
          <span className="hidden sm:inline">Add New Column</span>
        </Button>
      </CreateColumnDialog>
    </div>
  );
};

export default ColumnList;
