import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';

import CardTask from '../molecules/CardTask';
import DropdownMenu from '../molecules/DropdownMenu';
import SelectInput from '../molecules/SelectComponent';
import Subtask from '../molecules/Subtask';

type Props = {
  id: number;
  title: string;
  description: string | null;
  subtasks: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
};

const ViewTaskDialog: React.FC<Props> = ({
  description,
  id,
  subtasks,
  title,
}) => {
  return (
    <article>
      <Dialog>
        <DialogTrigger className="text-left">
          <CardTask title={title} subtasks={subtasks} />
        </DialogTrigger>

        <DialogContent hideCloseIcon className="gap-6">
          <DialogHeader className="flex flex-row items-center justify-between space-x-6">
            <DialogTitle className="max-w-[387px] font-bold leading-6">
              {title}
            </DialogTitle>
            <DropdownMenu options={['Edit Task', 'Delete Task']} />
          </DialogHeader>

          <DialogDescription className="text-[13px] font-medium text-input-foreground">
            {description}
          </DialogDescription>

          <div>
            <DialogDescription className="mb-[16px] text-xs font-bold text-input-foreground">
              {`Subtasks (1 of ${subtasks.length})`}
            </DialogDescription>

            <ul className="space-y-2">
              {subtasks.map((item) => (
                <Subtask
                  {...item}
                  key={item.id}
                />
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-input-foreground">
              Current status
            </p>
            <SelectInput options={[{ id: 1, name: 'Option' }]} />
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default ViewTaskDialog;
