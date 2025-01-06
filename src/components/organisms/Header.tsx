'use client';

import React from 'react';
import { EllipsisVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../atoms/icons/Logo';
import { Button } from '../atoms/button';
import { useSidebar } from '../atoms/sidebar';

const Header = () => {
  const { open } = useSidebar();

  return (
    <header
      className={cn(
        'fixed bg-background grid h-24 w-full items-center transition-all',
        open ? 'grid-cols-[300px_1fr]' : 'grid-cols-[209px_1fr]',
      )}
    >
      <div
        className={cn(
          'flex h-full w-[300px] items-center space-x-4 pl-[34px]',
          !open ? 'border-b-[1px]' : undefined,
        )}
      >
        <Logo />
        <h1 className="text-heading-xl font-extrabold">kanban</h1>
      </div>

      <div className="-ml-[1px] flex h-full w-full items-center justify-between border-b-[1px] border-l-[1px] pl-6 pr-8">
        <h2 className="w-fit text-heading-xl">Platform Launch</h2>

        <div className="flex items-center space-x-6">
          <Button size="lg" className="">
            + Add new Task
          </Button>
          <EllipsisVertical className="cursor-pointer text-secondary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
