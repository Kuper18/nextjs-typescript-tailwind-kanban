import React from 'react';

import { cn } from '@/lib/utils';

import { Checkbox } from '../atoms/checkbox';

type Props = {
  title: string;
  isCompleted: boolean;
};

const Subtask = ({ isCompleted, title }: Props) => {
  return (
    <li className="flex cursor-pointer items-center space-x-[16px] rounded-sm bg-primary p-3 hover:bg-accent-hover-secondary">
      <Checkbox checked={isCompleted} />
      <h3
        className={cn(
          'text-xs font-bold',
          isCompleted ? 'text-check-box-foreground line-through' : undefined,
        )}
      >
        {title}
      </h3>
    </li>
  );
};

export default Subtask;
