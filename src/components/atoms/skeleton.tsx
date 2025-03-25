import React from 'react';

import { cn } from '@/lib/utils';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-skeleton-1 relative overflow-hidden rounded-md',
        className,
      )}
      {...props}
    >
      <div className="animate-shimmer via-skeleton-2 absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
};

export { Skeleton };
