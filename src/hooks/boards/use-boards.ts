import { useQuery } from '@tanstack/react-query';

import BoardsService from '@/services/boards';

const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: BoardsService.get,
    staleTime: 60 * 5 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useBoards;
