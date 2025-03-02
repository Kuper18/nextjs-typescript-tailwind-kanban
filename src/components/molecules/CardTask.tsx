import React from 'react';

import { Card } from '../atoms/card';

type Props = {
  title: string;
  subtasks: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
};

const CardTask: React.FC<Props> = ({ subtasks, title }) => {
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <Card className="w-[280px] border-none px-[16px] py-[23px] shadow-custom">
      <h3 className="mb-2 text-heading-m leading-5">{title}</h3>
      <p className="text-body-m text-secondary-foreground">
        {`${completedSubtasks.length} of ${subtasks.length} substasks`}
      </p>
    </Card>
  );
};

export default CardTask;
