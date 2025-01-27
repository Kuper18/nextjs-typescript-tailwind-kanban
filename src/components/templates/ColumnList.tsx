import React from 'react';
import Column from '../organisms/Column';

const ColumnList = () => {
  return (
    <div className="flex space-x-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <Column key={item} />
      ))}
    </div>
  );
};

export default ColumnList;
