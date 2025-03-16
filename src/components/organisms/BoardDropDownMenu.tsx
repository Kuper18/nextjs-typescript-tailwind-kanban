import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

import useBoards from '@/hooks/boards/use-boards';
import useColumns from '@/hooks/columns/use-columns';
import BoardsService from '@/services/boards';
import { IBoard } from '@/services/boards/types';
import useBoardToUpdateStore from '@/store/boards';
import { useAlertStore } from '@/store/modal';
import { IDropdownOption } from '@/types';
import { handleErrorResponse, showNotification } from '@/utils';

import DropdownMenu from '../molecules/DropdownMenu';

const BoardDropDownMenu = () => {
  const { data: boards } = useBoards();
  const { data: columns } = useColumns();

  const router = useRouter();
  const { boardId } = useParams<{ boardId: string }>();
  const queryClient = useQueryClient();

  const { setBoardToUpdate, triggerOpenModal } = useBoardToUpdateStore();
  const { setAlertData, toggleOpen } = useAlertStore();

  const board = boards?.find((board) => board.id === Number(boardId));

  const { mutate } = useMutation({
    mutationFn: BoardsService.delete,
    onSuccess: () => {
      queryClient.setQueryData(['boards'], (oldData: IBoard[] | undefined) => {
        return oldData?.filter((board) => board.id !== Number(boardId));
      });
      showNotification('success', 'Board was deleted');
      router.push('/');
    },
    onError: handleErrorResponse,
    onSettled: () => toggleOpen(false),
  });

  const handleUpdateBoard = useCallback(() => {
    setBoardToUpdate({
      ...(board as IBoard),
      columns: columns ?? [],
    });
    triggerOpenModal();
  }, [board, columns, setBoardToUpdate, triggerOpenModal]);

  const handleDeleteBoard = useCallback(() => {
    setAlertData({
      title: 'Delete this board?',
      description: `Are you sure you want to delete the '${board?.name ?? ''}' board? This action will remove all columns and tasks and cannot be reversed.`,
      onConfirm: () => mutate(boardId),
    });
    toggleOpen();
  }, [board?.name, boardId, mutate, setAlertData, toggleOpen]);

  const options: IDropdownOption[] = useMemo(
    () => [
      { title: 'Edit Board', action: handleUpdateBoard },
      {
        title: 'Delete Board',
        action: handleDeleteBoard,
        className:
          'text-destructive text-[13px] font-medium focus:text-destructive',
      },
    ],
    [handleUpdateBoard, handleDeleteBoard],
  );

  return (
    <DropdownMenu
      modal={false}
      align="end"
      side="bottom"
      sideOffset={20}
      options={options}
      disabled={!boardId}
    />
  );
};

export default BoardDropDownMenu;
