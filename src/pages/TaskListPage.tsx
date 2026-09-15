import { useState } from 'react'
import TaskFormModal from '@/components/TaskForm/TaskFormModal'
import { useTasks } from '@/hooks/useTasks'

function TaskListPage() {
  const { data: tasks, isLoading, isError } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 bg-white p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-slate-900 px-4 py-2 text-white dark:bg-white dark:text-slate-900"
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
            <li
              key={task.id}
              className="rounded border border-slate-200 p-3 dark:border-slate-700"
            >
              <span className="font-medium">{task.name}</span>{' '}
              <span className="text-slate-500 dark:text-slate-400">{task.status}</span>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && <TaskFormModal mode="create" onClose={() => setIsModalOpen(false)} />}
    </main>
  )
}

export default TaskListPage
