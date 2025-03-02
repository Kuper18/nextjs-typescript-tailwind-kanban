'use client';

import React from 'react';

import useColumns from '@/hooks/columns/use-columns';

import Column from '../organisms/Column';

const ColumnList = () => {
  const { data: columns } = useColumns();

  return (
    <div className="flex h-[calc(100vh-134px)] space-x-6">
      {columns?.map((item) => <Column key={item.id} {...item} />)}
    </div>
  );
};

export default ColumnList;
