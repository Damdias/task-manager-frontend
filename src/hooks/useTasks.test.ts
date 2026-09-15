import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createQueryClientWrapper } from '@/test/queryClientWrapper'
import type { Task } from '@/types/task'
import { useTasks } from './useTasks'

vi.mock('@/api/tasks')

const { getTasks } = await import('@/api/tasks')

const task: Task = {
  id: 1,
  name: 'Write PRD',
  description: null,
  status: 'Pending',
  createdDate: '2026-09-10T08:00:00Z',
  completedDate: null,
}

describe('useTasks', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns the fetched task list on success', async () => {
    vi.mocked(getTasks).mockResolvedValue([task])

    const { result } = renderHook(() => useTasks(), { wrapper: createQueryClientWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual([task])
  })

  it('surfaces an error when the request fails', async () => {
    vi.mocked(getTasks).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useTasks(), { wrapper: createQueryClientWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
