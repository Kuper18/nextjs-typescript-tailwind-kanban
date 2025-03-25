'use clinet';

import { ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import useBoards from '@/hooks/boards/use-boards';
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
import { ScrollArea } from '../atoms/scroll-area';
import { Skeleton } from '../atoms/skeleton';
import AsideContent from '../molecules/AsideContent';
import ToggleThemeButton from '../molecules/ToggleThemeButton';

const MobileMenu = () => {
  const { data: boards, isFetching } = useBoards();
  const { boardId } = useParams<{ boardId: string }>();

  const board = boards?.find((board) => board.id === Number(boardId));

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      {isFetching ? (
        <Skeleton className="h-7 w-40" />
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogOverlay className="top-[64px] z-50" />

          <DialogTrigger asChild>
            <Button variant="ghost" className="h-fit p-0 text-lg font-bold">
              {board?.name ?? 'kanban'}
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
            className="top-[80px] w-[264px] translate-y-[0px] rounded-lg border-none px-0 py-4"
          >
            <ScrollArea className="max-h-[80vh] w-[264px]">
              <DialogHeader className="pl-6 text-left">
                <DialogTitle className="text-sm tracking-[2.4px] text-input-foreground">
                  {`ALL BOARDS (${boards?.length})`}
                </DialogTitle>
              </DialogHeader>

              <AsideContent />

              <DialogFooter className="w-235px mx-auto">
                <ToggleThemeButton />
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MobileMenu;
