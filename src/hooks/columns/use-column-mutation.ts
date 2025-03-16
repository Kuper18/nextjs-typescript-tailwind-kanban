import { useMutation } from '@tanstack/react-query';

import ColumnsService from '@/services/columns';
import { handleErrorResponse } from '@/utils';

const useColumnMutation = () => {
  const columnsMutation = {
    update: useMutation({
      mutationFn: ColumnsService.put,
      onError: handleErrorResponse,
    }),
    add: useMutation({
      mutationFn: ColumnsService.post,
      onError: handleErrorResponse,
    }),
    delete: useMutation({
      mutationFn: ColumnsService.delete,
      onError: handleErrorResponse,
    }),
  };

  return { columnsMutation };
};

export default useColumnMutation;
