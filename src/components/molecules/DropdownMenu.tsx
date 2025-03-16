import { EllipsisVertical } from 'lucide-react';
import React from 'react';

import {
  DropdownMenu as DropdownMenuAtom,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { cn } from '@/lib/utils';
import { IDropdownOption } from '@/types';

type Props = {
  options: IDropdownOption[];
  side?: 'bottom' | 'top' | 'right' | 'left';
  align?: 'center' | 'end' | 'start';
  sideOffset?: number;
  modal?: boolean;
  disabled?: boolean;
};

const DropdownMenu = ({
  options,
  side,
  align,
  sideOffset,
  disabled,
  modal = true,
}: Props) => {
  return (
    <DropdownMenuAtom modal={modal}>
      <DropdownMenuTrigger disabled={disabled} asChild>
        <EllipsisVertical
          className={cn(
            'shrink-0 cursor-pointer text-secondary-foreground',
            disabled ? 'cursor-default' : undefined,
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-[192px] border-none"
      >
        {options.map(({ title, action, className }) => (
          <DropdownMenuItem className={className} onClick={action} key={title}>
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuAtom>
  );
};

export default DropdownMenu;
