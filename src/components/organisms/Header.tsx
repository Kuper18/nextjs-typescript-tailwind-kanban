'use client';

import { EllipsisVertical } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import Logo from '../atoms/icons/Logo';
import { useSidebar } from '../atoms/sidebar';

import CreateTaskDialog from './CreateTaskDialog';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { open } = useSidebar();

  return (
    <header
      className={cn(
        'fixed z-50 grid h-16 w-full items-center bg-background transition-all sm:h-[81px] lg:h-24',
        open
          ? 'grid-cols-[40px_1fr] sm:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]'
          : 'grid-cols-[209px_1fr]',
      )}
    >
      <div
        className={cn(
          'flex h-full w-fit items-center space-x-4 pl-[16px] sm:w-[260px] md:pl-[26px] lg:w-[300px] lg:pl-[34px]',
          !open ? 'border-b-[1px]' : undefined,
        )}
      >
        <Logo />
        <h1 className="sr-only text-heading-xl font-extrabold sm:not-sr-only">
          kanban
        </h1>
      </div>

      <div className="-ml-[1px] flex h-full w-full items-center justify-between pl-[16px] pr-[16px] sm:border-b-[1px] sm:border-l-[1px] sm:pl-6 sm:pr-6 lg:pr-8">
        <h2 className="hidden w-fit text-lg font-bold sm:inline-flex sm:text-xl lg:text-heading-xl">
          Platform Launch
        </h2>

        <MobileMenu />

        <div className="flex items-center space-x-[16px] sm:space-x-6">
          <CreateTaskDialog />
          <EllipsisVertical className="cursor-pointer text-secondary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
