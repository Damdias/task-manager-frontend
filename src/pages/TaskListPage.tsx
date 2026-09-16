import { useState } from 'react'
import TaskFormModal from '@/components/TaskForm/TaskFormModal'
import { useTasks } from '@/hooks/useTasks'

function TaskListPage() {
  const { data: tasks, isLoading, isError } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 bg-white p-6 text-dark">
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-medium">Tasks</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-button text-button bg-dark px-[35px] py-5 text-white underline"
        >
          Add Task
        </button>
      </div>

      {isLoading && <p role="status">Loading tasks…</p>}
      {isError && <p role="alert">Something went wrong loading tasks.</p>}
      {!isLoading && !isError && tasks?.length === 0 && <p>No tasks yet — add one to get started</p>}
      {!isLoading && !isError && tasks && tasks.length > 0 && (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li key={task.id} className="rounded-lg border border-grey p-3">
              <span className="font-medium">{task.name}</span>{' '}
              <span className="rounded-chip bg-green px-[7px] text-black">{task.status}</span>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && <TaskFormModal mode="create" onClose={() => setIsModalOpen(false)} />}
    </main>
  )
}

export default TaskListPage
