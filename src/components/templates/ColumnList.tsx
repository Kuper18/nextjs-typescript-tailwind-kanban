'use client';

import React, { Usable } from 'react';

import useColumns from '@/hooks/columns/use-columns';

import Column from '../organisms/Column';

type Props = {
  params: Usable<{ boardId: string }>;
};

const ColumnList: React.FC<Props> = ({ params }) => {
  const { boardId } = React.use(params);
  const { data: columns } = useColumns(boardId);

  return (
    <div className="flex h-[calc(100vh-134px)] space-x-6">
      {columns?.map((item) => <Column key={item.id} {...item} />)}
    </div>
  );
};

export default ColumnList;
