import { useMutation } from '@tanstack/react-query';

import SubtasksService from '@/services/subtasks';
import { handleErrorResponse } from '@/utils';

const useSubtaskMutation = () => {
  const subtaskMutation = {
    update: useMutation({
      mutationFn: SubtasksService.patch,
      onError: handleErrorResponse,
    }),
    add: useMutation({
      mutationFn: SubtasksService.post,
      onError: handleErrorResponse,
    }),
    delete: useMutation({
      mutationFn: SubtasksService.delete,
      onError: handleErrorResponse,
    }),
  };

  return { subtaskMutation };
};

export default useSubtaskMutation;
