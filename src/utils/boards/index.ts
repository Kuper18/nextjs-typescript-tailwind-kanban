import { IBoard } from '@/services/boards/types';
import { IColumn } from '@/services/columns/types';
import { IBoardToUpdate } from '@/store/boards/types';
import {
  ICreateBoardSuccess,
  IUpdateBoardSuccess,
  TBoardFormData,
} from '@/types';

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
  showNotification('success', 'New board was created');
};

export const handleBoardUpdateSuccess = async ({
  board,
  columns,
  columnsIdsToDelete,
  queryClient,
  resetBoardToUpdate,
  mutateAsyncAdd,
  mutateAsyncDelete,
  mutateAsyncUpdate,
  triggerOpenModal,
}: IUpdateBoardSuccess) => {
  const { toUpdate, toCreate } = columns.reduce<{
    toUpdate: Promise<IColumn>[];
    toCreate: Promise<IColumn>[];
  }>(
    (acc, curr) => {
      if (curr.id) {
        acc.toUpdate.push(
          mutateAsyncUpdate({
            name: curr.name,
            columnId: Number(curr.id),
          }),
        );
      } else {
        acc.toCreate.push(
          mutateAsyncAdd({
            name: curr.name,
            boardId: board.id,
          }),
        );
      }
      return acc;
    },
    { toUpdate: [], toCreate: [] },
  );

  try {
    await Promise.all(toUpdate);

    if (toCreate.length) {
      await Promise.all(toCreate);
    }
  } catch (error) {
    console.error('Failed to update subtasks:', error);
  }

  if (columnsIdsToDelete.length) {
    const columnToDeletePomises = columnsIdsToDelete.map((id) => mutateAsyncDelete(id));

    try {
      await Promise.all(columnToDeletePomises);
    } catch (error) {
      console.error('Failed to delete subtasks:', error);
    }
  }

  queryClient.setQueryData(['boards'], (oldData: IBoard[] | undefined) => {
    return oldData
      ? [...oldData.filter((b) => b.id !== board.id), board]
      : [board];
  });
  queryClient.invalidateQueries({ queryKey: ['columns'] });
  triggerOpenModal();
  showNotification('success', 'Board was updated');
  resetBoardToUpdate();
};
