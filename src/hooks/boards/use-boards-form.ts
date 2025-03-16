import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { newBoardSchema } from '@/schemas/board';
import BoardsService from '@/services/boards';
import useBoardToUpdateStore from '@/store/boards';
import { TAction, TBoardFormData } from '@/types';
import {
  createDefaultValues,
  handleBoardCreationSuccess,
  handleBoardUpdateSuccess,
} from '@/utils/boards';

import useColumnMutation from '../columns/use-column-mutation';

const useBoardsForm = (action: TAction) => {
  const queryClient = useQueryClient();
  const { board, triggerOpenModal } = useBoardToUpdateStore();
  const { columnsMutation } = useColumnMutation();
  const form = useForm<TBoardFormData>({
    resolver: zodResolver(newBoardSchema),
    defaultValues: createDefaultValues(board),
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });

  const [columnsIdsToDelete, setColumnsIdsToDelete] = useState<string[]>([]);

  const handleRemove = (index: number) => {
    if (action === 'update') {
      const id = form.getValues('columns')[index].id as string;

      setColumnsIdsToDelete((prev) => [...prev, id]);
    }

    remove(index);
  };

  const boardMutationAdd = useMutation({
    mutationFn: BoardsService.post,
    onSuccess: (createdBoard) => handleBoardCreationSuccess({
      board: createdBoard,
      columns: form.getValues('columns'),
      queryClient,
      triggerOpenModal,
      mutateAsyncAdd: columnsMutation.add.mutateAsync,
    }),
  });

  const boardMutationUpdate = useMutation({
    mutationFn: BoardsService.put,
    onSuccess: (board) => handleBoardUpdateSuccess({
      board,
      columns: form.getValues('columns'),
      queryClient,
      columnsIdsToDelete,
      triggerOpenModal,
      mutateAsyncAdd: columnsMutation.add.mutateAsync,
      mutateAsyncDelete: columnsMutation.delete.mutateAsync,
      mutateAsyncUpdate: columnsMutation.update.mutateAsync,
    }),
  });

  const handleSubmit = ({ name }: TBoardFormData) => {
    if (action === 'create') {
      boardMutationAdd.mutate({ name });
    } else {
      boardMutationUpdate.mutate({ name, boardId: board?.id as number });
    }
  };

  return {
    fields,
    isLoading: boardMutationAdd.isPending || boardMutationUpdate.isPending,
    form,
    append,
    handleRemove,
    handleSubmit,
  };
};

export default useBoardsForm;
