import { apiClient } from '@/api/client'
import type { CreateTaskRequest, Task } from '@/types/task'

export async function getTasks(): Promise<Task[]> {
  const { data } = await apiClient.get<Task[]>('/api/tasks')
  return data
}

export async function createTask(payload: CreateTaskRequest): Promise<Task> {
  const { data } = await apiClient.post<Task>('/api/tasks', payload)
  return data
}
