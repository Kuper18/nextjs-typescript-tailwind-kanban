import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../atoms/button';
import DotColor from '../atoms/dot-color';
import { ScrollArea } from '../atoms/scroll-area';

import CreateTaskDialog from './CreateTaskDialog';
import ViewTaskDialog from './ViewTaskDialog';

type Props = {
  id: number;
  name: string;
  tasks: {
    id: number;
    title: string;
    description: string | null;
    subtasks: {
      id: number;
      title: string;
      isCompleted: boolean;
    }[];
  }[];
};

const Column: React.FC<Props> = ({ id, name, tasks }) => {
  const { setNodeRef } = useDroppable({ id });
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragEnd() {
      setIsDragging(false);
    },
    onDragCancel() {
      setIsDragging(false);
    },
  });

  const elements = useMemo(
    () => (
      <>
        <h3 className="mb-6 flex items-center gap-3 text-heading-s text-secondary-foreground">
          <DotColor />
          {name}
        </h3>
        <div className="space-y-5">
          {tasks.length ? (
            tasks?.map((item) => (
              <ViewTaskDialog columnId={id} key={item.id} {...item} />
            ))
          ) : (
            <CreateTaskDialog>
              <Button className="flex min-h-[89px] w-[280px] flex-col rounded-lg bg-background text-secondary-foreground shadow-custom hover:bg-background">
                Add New Task
                <Plus />
              </Button>
            </CreateTaskDialog>
          )}
        </div>
      </>
    ),
    [id, name, tasks],
  );

  return (
    <div ref={setNodeRef}>
      <section className="w-[280px] flex-shrink-0">
        {isDragging ? (
          elements
        ) : (
          <ScrollArea className={cn('h-[calc(100vh-156px)] w-[290px]')}>
            {elements}
          </ScrollArea>
        )}
      </section>
    </div>
  );
};

export default Column;
