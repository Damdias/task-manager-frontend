import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TaskFormModal from './TaskFormModal'

vi.mock('@/hooks/useCreateTask')

const { useCreateTask } = await import('@/hooks/useCreateTask')

function mockMutate(mutate: ReturnType<typeof vi.fn>) {
  vi.mocked(useCreateTask).mockReturnValue({
    mutate,
    isPending: false,
  } as unknown as ReturnType<typeof useCreateTask>)
}

describe('TaskFormModal', () => {
  it('submits with only the Name field and closes on success', async () => {
    const mutate = vi.fn((_payload, options) => {
      options?.onSuccess?.()
    })
    mockMutate(mutate)
    const onClose = vi.fn()

    render(<TaskFormModal mode="create" onClose={onClose} />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Write PRD' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(mutate).toHaveBeenCalledWith(
      { name: 'Write PRD', description: undefined },
      expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) }),
    )
    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })

  it('submits with Name and Description', () => {
    const mutate = vi.fn()
    mockMutate(mutate)

    render(<TaskFormModal mode="create" onClose={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Write PRD' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Draft the doc' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(mutate).toHaveBeenCalledWith(
      { name: 'Write PRD', description: 'Draft the doc' },
      expect.anything(),
    )
  })

  it('shows an inline error and keeps the modal open when Name is empty', () => {
    const mutate = vi.fn((_payload, options) => {
      options?.onError?.({
        isAxiosError: true,
        response: { data: { message: 'Validation failed.', errors: { name: ['Name is required.'] } } },
      })
    })
    mockMutate(mutate)
    const onClose = vi.fn()

    render(<TaskFormModal mode="create" onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('shows an inline error when a field exceeds its length limit', () => {
    const mutate = vi.fn((_payload, options) => {
      options?.onError?.({
        isAxiosError: true,
        response: {
          data: {
            message: 'Validation failed.',
            errors: { name: ['Name must be 200 characters or fewer.'] },
          },
        },
      })
    })
    mockMutate(mutate)

    render(<TaskFormModal mode="create" onClose={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'a'.repeat(201) } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.getByText('Name must be 200 characters or fewer.')).toBeInTheDocument()
  })
})
