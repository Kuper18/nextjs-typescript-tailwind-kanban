'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import React from 'react';

import useColumns from '@/hooks/columns/use-columns';
import TasksService from '@/services/tasks';

type Props = {
  children: React.ReactNode;
};

const DndProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: columns } = useColumns();

  const { mutate } = useMutation({
    mutationFn: TasksService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !columns) return;

    const taskId = active.id as number;
    const targetColumnId = over.id as number;

    let taskToMove = null;

    for (const col of columns) {
      const foundTask = col.tasks.find((task) => task.id === taskId);
      if (foundTask) {
        taskToMove = foundTask;
        break;
      }
    }

    if (taskToMove) {
      mutate({
        columnId: targetColumnId,
        taskId: taskToMove.id,
        description: taskToMove.description,
        title: taskToMove.title,
      });
    }
  };
  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};

export default DndProvider;
