import { EllipsisVertical } from 'lucide-react';
import React from 'react';

import {
  DropdownMenu as DropdownMenuAtom,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { IDropdownOption } from '@/types';

type Props = {
  options: IDropdownOption[];
  side?: 'bottom' | 'top' | 'right' | 'left';
  align?: 'center' | 'end' | 'start';
  sideOffset?: number;
  modal?: boolean
};

const DropdownMenu = ({
  options, side, align, sideOffset, modal = true,
}: Props) => {
  return (
    <DropdownMenuAtom modal={modal}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="shrink-0 cursor-pointer text-secondary-foreground" />
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
