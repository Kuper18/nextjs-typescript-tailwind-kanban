import { Plus } from 'lucide-react';
import React from 'react';

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
  // const { data: tasks } = useTasks(id);

  return (
    <section className="w-[280px] flex-shrink-0">
      <ScrollArea className="h-[calc(100vh-156px)]">
        <h3 className="mb-6 flex items-center gap-3 text-heading-s text-secondary-foreground">
          <DotColor />
          {name}
        </h3>
        <div className="space-y-5">
          {tasks.length ? (
            tasks?.map((item) => <ViewTaskDialog columnId={id} key={item.id} {...item} />)
          ) : (
            <CreateTaskDialog>
              <Button className="flex min-h-[89px] w-[280px] flex-col rounded-lg bg-background text-secondary-foreground shadow-custom hover:bg-background">
                Add New Task
                <Plus />
              </Button>
            </CreateTaskDialog>
          )}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Column;
