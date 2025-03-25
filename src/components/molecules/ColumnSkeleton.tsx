import React from 'react';

import { Skeleton } from '../atoms/skeleton';

const ColumnSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-134px)] space-x-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item}>
          <div className="mb-6 flex gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-[90px] w-[280px]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColumnSkeleton;
