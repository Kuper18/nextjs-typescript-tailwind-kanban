import React from 'react';

import useTasks from '@/hooks/tasks/use-tasks';

import DotColor from '../atoms/dot-color';
import { ScrollArea } from '../atoms/scroll-area';

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
  // const { data: tasks } = useTasks(id);

  return (
    <section className="w-[280px] flex-shrink-0">
      <ScrollArea className="h-[calc(100vh-156px)]">
        <h3 className="mb-6 flex items-center gap-3 text-heading-s text-secondary-foreground">
          <DotColor />
          {name}
        </h3>
        <div className="space-y-5">
          {tasks?.map((item) => <ViewTaskDialog key={item.id} {...item} />)}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Column;
