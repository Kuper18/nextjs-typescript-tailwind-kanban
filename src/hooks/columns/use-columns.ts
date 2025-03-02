import { useQuery } from '@tanstack/react-query';

import ColumnsService from '@/services/columns';

const useColumns = (boardId: string) => {
  return useQuery({
    queryKey: ['columns', boardId],
    queryFn: async () => ColumnsService.get(boardId),
    staleTime: 60 * 5 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useColumns;
