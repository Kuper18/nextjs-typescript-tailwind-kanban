import { useQuery } from '@tanstack/react-query';

import TasksService from '@/services/tasks';

const useTasks = (columnId: number) => {
  return useQuery({
    queryKey: ['tasks', columnId],
    queryFn: async () => TasksService.get(columnId),
    staleTime: 60 * 5 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useTasks;
