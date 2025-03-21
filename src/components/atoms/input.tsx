import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-sm border border-input bg-transparent px-4 py-2 text-base font-semibold transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-placeholder focus:border-ring focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-[13px]',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
