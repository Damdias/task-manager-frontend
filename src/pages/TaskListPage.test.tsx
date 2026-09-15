import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Task } from '@/types/task'
import TaskListPage from './TaskListPage'

vi.mock('@/hooks/useTasks')

const { useTasks } = await import('@/hooks/useTasks')

const task: Task = {
  id: 1,
  name: 'Write PRD',
  description: null,
  status: 'Pending',
  createdDate: '2026-09-10T08:00:00Z',
  completedDate: null,
}

describe('TaskListPage', () => {
  it('shows a loading indicator while tasks are loading', () => {
    vi.mocked(useTasks).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useTasks>)

    render(<TaskListPage />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows an error state when the request fails', () => {
    vi.mocked(useTasks).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useTasks>)

    render(<TaskListPage />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('shows the empty-state message when there are no tasks', () => {
    vi.mocked(useTasks).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useTasks>)

    render(<TaskListPage />)

    expect(screen.getByText('No tasks yet — add one to get started')).toBeInTheDocument()
  })

  it('renders each task name and status when tasks exist', () => {
    vi.mocked(useTasks).mockReturnValue({
      data: [task],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useTasks>)

    render(<TaskListPage />)

    expect(screen.getByText('Write PRD')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })
})
