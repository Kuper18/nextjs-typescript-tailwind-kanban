import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import ColumnsService from '@/services/columns';

const useColumns = () => {
  const { boardId } = useParams<{ boardId: string }>();

  return useQuery({
    queryKey: ['columns', boardId],
    queryFn: boardId ? async () => ColumnsService.get(boardId) : undefined,
    staleTime: 60 * 5 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useColumns;
