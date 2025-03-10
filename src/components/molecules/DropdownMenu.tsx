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
};

const DropdownMenu = ({ options }: Props) => {
  return (
    <DropdownMenuAtom>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="shrink-0 cursor-pointer text-secondary-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[192px] border-none">
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
