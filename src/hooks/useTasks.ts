import { useQuery } from '@tanstack/react-query'
import { getTasks } from '@/api/tasks'

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
}
