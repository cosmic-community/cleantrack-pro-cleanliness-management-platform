import { cosmic, hasStatus } from '@/lib/cosmic'
import { TaskAssignment } from '@/types'
import ManagerLayout from '@/components/ManagerLayout'
import FailedTasksList from '@/components/FailedTasksList'

async function getFailedTasks() {
  try {
    const response = await cosmic.objects
      .find({ type: 'task-assignments' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const assignments = response.objects as TaskAssignment[]
    
    // Filter for failed and rejected tasks
    const failedTasks = assignments.filter(a => 
      a.metadata.status.value === 'Failed' || a.metadata.status.value === 'Rejected'
    )

    return failedTasks
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function FailedTasksPage() {
  const failedTasks = await getFailedTasks()

  return (
    <ManagerLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Failed Tasks</h1>
        <p className="text-gray-600">Review and manage tasks that require attention</p>
      </div>

      <FailedTasksList tasks={failedTasks} />
    </ManagerLayout>
  )
}