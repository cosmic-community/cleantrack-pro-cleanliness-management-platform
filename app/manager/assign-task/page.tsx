import { cosmic, hasStatus } from '@/lib/cosmic'
import { Task, User } from '@/types'
import ManagerLayout from '@/components/ManagerLayout'
import AssignTaskForm from '@/components/AssignTaskForm'

async function getTasksAndStaff() {
  try {
    // Fetch all tasks
    const tasksResponse = await cosmic.objects
      .find({ type: 'tasks' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const tasks = tasksResponse.objects as Task[]

    // Fetch all staff users
    const usersResponse = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const allUsers = usersResponse.objects as User[]
    const staffUsers = allUsers.filter(u => u.metadata.role.value === 'Staff' && u.metadata.active_status)

    return { tasks, staffUsers }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { tasks: [], staffUsers: [] }
    }
    throw error
  }
}

export default async function AssignTaskPage() {
  const { tasks, staffUsers } = await getTasksAndStaff()

  return (
    <ManagerLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign New Task</h1>
        <p className="text-gray-600">Create and assign tasks to staff members</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <AssignTaskForm tasks={tasks} staffUsers={staffUsers} />
      </div>
    </ManagerLayout>
  )
}