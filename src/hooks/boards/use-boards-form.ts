import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { newBoardSchema } from '@/schemas/board';
import BoardsService from '@/services/boards';
import { IBoard } from '@/services/boards/types';
import useBoardToUpdateStore from '@/store/boards';
import { TAction, TBoardFormData } from '@/types';
import {
  createDefaultValues,
  handleBoardCreationSuccess,
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
      setColumnsIdsToDelete((prev) => [
        ...prev,
        form.getValues('columns')[index]?.id as string,
      ]);
    }

    remove(index);
  };

  const boardMutationAdd = useMutation({
    mutationFn: BoardsService.post,
    onSuccess: (createdBoard) =>
      handleBoardCreationSuccess({
        board: createdBoard,
        columns: form.getValues('columns'),
        queryClient,
        triggerOpenModal,
        mutateAsyncAdd: columnsMutation.add.mutateAsync,
      }),
  });

  const boardMutationUpdate = useMutation({
    mutationFn: BoardsService.put,
    onSuccess: async (updatedBoard) => {
      const columnPromises = form
        .getValues('columns')
        .filter((item) => !item.id)
        .map((column) => {
          return columnsMutation.add.mutateAsync({
            name: column.name,
            boardId: updatedBoard.id,
          });
        });

      const columnPromisesUpdate = form
        .getValues('columns')
        .filter((item) => item.id)
        .map((column) => {
          return columnsMutation.update.mutateAsync({
            name: column.name,
            columnId: Number(column.id),
          });
        });

      queryClient.setQueryData(['boards'], (oldData: IBoard[] | undefined) => {
        return oldData
          ? [
              ...oldData.filter((board) => board.id !== updatedBoard.id),
              updatedBoard,
            ]
          : [updatedBoard];
      });

      const columnPromisesDelete = columnsIdsToDelete.map((id) =>
        columnsMutation.delete.mutateAsync(id),
      );

      try {
        await Promise.all(columnPromises);
        await Promise.all(columnPromisesUpdate);

        if (columnPromisesDelete.length) {
          await Promise.all(columnPromisesDelete);
        }
        queryClient.invalidateQueries({ queryKey: ['columns'] });
      } catch (error) {
        console.error('Failed to create columns:', error);
      }
      triggerOpenModal();
    },
  });

  const isLoading =
    boardMutationAdd.isPending ||
    columnsMutation.add.isPending ||
    columnsMutation.delete.isPending;

  const handleSubmit = ({ name }: TBoardFormData) => {
    if (action === 'create') {
      boardMutationAdd.mutate({ name });
    } else {
      boardMutationUpdate.mutate({ name, boardId: board?.id as number });
    }
  };

  return {
    fields,
    isLoading,
    form,
    append,
    handleRemove,
    handleSubmit,
  };
};

export default useBoardsForm;

// const boardMutationAdd = useMutation({
//   mutationFn: BoardsService.post,
//   onSuccess: async (createdBoard) => {
//     const columnPromises = form.getValues('columns').map((column) => {
//       return columnsMutation.add.mutateAsync({
//         name: column.name,
//         boardId: createdBoard.id,
//       });
//     });

//     queryClient.setQueryData(['boards'], (oldData: IBoard[] | undefined) => {
//       return oldData ? [...oldData, createdBoard] : [createdBoard];
//     });

//     try {
//       await Promise.all(columnPromises);
//     } catch (error) {
//       console.error('Failed to create columns:', error);
//     }
//   },
// });
