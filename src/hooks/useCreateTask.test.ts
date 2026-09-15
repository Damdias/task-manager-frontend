import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createQueryClientWrapper } from '@/test/queryClientWrapper'
import type { Task } from '@/types/task'
import { useCreateTask } from './useCreateTask'

vi.mock('@/api/tasks')

const { createTask } = await import('@/api/tasks')

const task: Task = {
  id: 1,
  name: 'Write PRD',
  description: null,
  status: 'Pending',
  createdDate: '2026-09-10T08:00:00Z',
  completedDate: null,
}

describe('useCreateTask', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('creates a task and invalidates the tasks query on success', async () => {
    vi.mocked(createTask).mockResolvedValue(task)

    const { result } = renderHook(() => useCreateTask(), { wrapper: createQueryClientWrapper() })

    result.current.mutate({ name: 'Write PRD' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(createTask).toHaveBeenCalledWith({ name: 'Write PRD' }, expect.anything())
  })

  it('exposes the error when creation fails', async () => {
    vi.mocked(createTask).mockRejectedValue(new Error('Validation failed'))

    const { result } = renderHook(() => useCreateTask(), { wrapper: createQueryClientWrapper() })

    result.current.mutate({ name: '' })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
