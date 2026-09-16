import { useState, type FormEvent } from 'react'
import { parseApiError } from '@/api/client'
import { useCreateTask } from '@/hooks/useCreateTask'

interface TaskFormModalProps {
  mode: 'create' | 'edit'
  onClose: () => void
}

function TaskFormModal({ mode, onClose }: TaskFormModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const createTask = useCreateTask()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFieldErrors({})

    createTask.mutate(
      { name, description: description || undefined },
      {
        onSuccess: () => onClose(),
        onError: (error) => {
          setFieldErrors(parseApiError(error).errors)
        },
      },
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'create' ? 'Add Task' : 'Edit Task'}
        className="w-full max-w-md rounded-lg bg-white p-6"
      >
        <h2 className="text-h4 mb-4 font-medium text-dark">
          {mode === 'create' ? 'Add Task' : 'Edit Task'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="task-name" className="text-sm font-medium text-dark">
              Name
            </label>
            <input
              id="task-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded border border-grey px-3 py-2 text-dark"
            />
            {fieldErrors.name?.map((message) => (
              <p key={message} role="alert" className="text-sm text-red-600">
                {message}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="task-description" className="text-sm font-medium text-dark">
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="rounded border border-grey px-3 py-2 text-dark"
            />
            {fieldErrors.description?.map((message) => (
              <p key={message} role="alert" className="text-sm text-red-600">
                {message}
              </p>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded px-4 py-2 text-dark">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createTask.isPending}
              className="rounded-button text-button bg-dark px-[35px] py-5 text-white underline disabled:opacity-60"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskFormModal
