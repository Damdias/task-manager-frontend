export type TaskStatus = 'Pending' | 'InProgress' | 'Completed'

export interface Task {
  id: number
  name: string
  description: string | null
  status: TaskStatus
  createdDate: string
  completedDate: string | null
}

export interface CreateTaskRequest {
  name: string
  description?: string
}
