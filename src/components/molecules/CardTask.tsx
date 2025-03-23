import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical } from 'lucide-react';
import React from 'react';

import { Card } from '../atoms/card';

type Props = {
  listeners?: SyntheticListenerMap;
  attributes: DraggableAttributes;
  title: string;
  subtasks: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
};

const CardTask: React.FC<Props> = ({
  subtasks,
  title,
  attributes,
  listeners,
}) => {
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <Card className="w-[280px] border-none px-[16px] py-[23px] shadow-custom">
      <h3 className="mb-2 flex justify-between text-heading-m leading-5">
        <span className="max-w-[248px] truncate">{title}</span>
        <GripVertical
          className="shrink-0 cursor-grab text-secondary-foreground"
          {...listeners}
          {...attributes}
        />
      </h3>
      <p className="text-body-m text-secondary-foreground">
        {`${completedSubtasks.length} of ${subtasks.length} substasks`}
      </p>
    </Card>
  );
};

export default CardTask;
