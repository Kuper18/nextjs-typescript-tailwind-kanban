import { IBoard } from '@/services/boards/types';
import { IBoardToUpdate } from '@/store/boards/types';
import { ICreateBoardSuccess, TBoardFormData } from '@/types';

import { showNotification } from '..';

export const createDefaultValues = (
  board: IBoardToUpdate | null,
): TBoardFormData => {
  const defaultColumns = board?.columns.map((item) => ({
    name: item.name,
    id: `${item.id}`,
  }));

  return {
    name: board?.name ?? '',
    columns:
      defaultColumns
      ?? Array.from([1, 2], () => ({
        name: '',
      })),
  };
};

export const handleBoardCreationSuccess = async ({
  board,
  mutateAsyncAdd,
  queryClient,
  columns,
  triggerOpenModal,
}: ICreateBoardSuccess) => {
  const columnPromises = columns.map(({ name }) => {
    return mutateAsyncAdd({
      name,
      boardId: board.id,
    });
  });

  queryClient.setQueryData(['boards'], (oldData: IBoard[] | undefined) => {
    return oldData ? [...oldData, board] : [board];
  });

  try {
    await Promise.all(columnPromises);
  } catch (error) {
    console.error('Failed to create columns:', error);
  }

  triggerOpenModal();
  showNotification('success', 'New board is created');
};
