import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { newBoardSchema } from '@/schemas/board';
import BoardsService from '@/services/boards';
import { IBoard } from '@/services/boards/types';
import ColumnsService from '@/services/columns';

type FormData = z.infer<typeof newBoardSchema>;

const useBoardsForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<FormData>({
    resolver: zodResolver(newBoardSchema),
    defaultValues: {
      name: '',
      columns: Array.from([1, 2], () => ({ name: '' })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'columns',
  });

  const columnMutation = useMutation({
    mutationFn: ColumnsService.post,
  });

  const boardMutation = useMutation({
    mutationFn: BoardsService.post,
    onSuccess: async (createdBoard) => {
      const columnPromises = form.getValues('columns').map((column) => {
        return columnMutation.mutateAsync({
          name: column.name,
          boardId: createdBoard.id,
        });
      });

      queryClient.setQueryData(['boards'], (oldData: IBoard[] | undefined) => {
        return oldData ? [...oldData, createdBoard] : [createdBoard];
      });

      try {
        await Promise.all(columnPromises);
      } catch (error) {
        console.error('Failed to create columns:', error);
      }
    },
  });

  const isLoading = boardMutation.isPending || columnMutation.isPending;

  const handleSubmit = ({ name }: FormData) => {
    boardMutation.mutate({ name });
  };

  return {
    fields,
    isLoading,
    form,
    append,
    remove,
    handleSubmit,
  };
};

export default useBoardsForm;
