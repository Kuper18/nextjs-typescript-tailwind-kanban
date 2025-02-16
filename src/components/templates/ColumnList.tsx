import React from 'react';

import Column from '../organisms/Column';

const ColumnList = () => {
  return (
    <div className="flex h-[calc(100vh-134px)] space-x-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Column key={item} />
      ))}
    </div>
  );
};

export default ColumnList;
