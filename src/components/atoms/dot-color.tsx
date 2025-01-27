import { generateRandomColor } from '@/utils';
import React from 'react';

const DotColor = () => {
  return (
    <div
      style={{ backgroundColor: generateRandomColor() }}
      className="h-[15px] w-[15px] rounded-full"
    />
  );
};

export default DotColor;
