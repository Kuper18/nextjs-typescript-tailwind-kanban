import { IIcon } from '@/types';
import React from 'react';

const CloseIcon = ({ fill, className }: IIcon) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="12.728"
        width="3"
        height="18"
        transform="rotate(45 12.728 0)"
        fill={fill ?? '#828FA3'}
      />
      <rect
        y="2.12132"
        width="3"
        height="18"
        transform="rotate(-45 0 2.12132)"
        fill={fill ?? '#828FA3'}
      />
    </svg>
  );
};

export default CloseIcon;
