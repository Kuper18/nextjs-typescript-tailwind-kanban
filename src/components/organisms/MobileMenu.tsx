'use clinet';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../atoms/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../atoms/dialog';
import AsideContent from '../molecules/AsideContent';
import ToggleThemeButton from '../molecules/ToggleThemeButton';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="top-[64px] z-50" />

        <DialogTrigger asChild>
          <Button variant="ghost" className="h-fit p-0 text-lg font-bold">
            Platform Launch
            <ChevronDown
              className={cn(
                'stroke-accent transition-transform',
                isOpen ? 'rotate-180' : undefined,
              )}
            />
          </Button>
        </DialogTrigger>

        <DialogContent
          hideCloseIcon
          hideOverlay
          aria-describedby={undefined}
          className="top-[238px] w-[264px] rounded-lg border-none px-0 py-4"
        >
          <DialogHeader className="pl-6 text-left">
            <DialogTitle className="text-sm tracking-[2.4px] text-input-foreground">
              ALL BOARDS (3)
            </DialogTitle>
          </DialogHeader>

          <AsideContent />

          <DialogFooter className="w-235px mx-auto">
            <ToggleThemeButton />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
