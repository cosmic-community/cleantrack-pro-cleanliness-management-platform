import { cosmic, hasStatus } from '@/lib/cosmic'
import { TaskAssignment } from '@/types'
import StaffLayout from '@/components/StaffLayout'
import StaffTasksList from '@/components/StaffTasksList'

async function getStaffTasks() {
  try {
    const response = await cosmic.objects
      .find({ type: 'task-assignments' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const assignments = response.objects as TaskAssignment[]
    
    // Sort by due date (earliest first)
    const sortedAssignments = assignments.sort((a, b) => {
      const dateA = new Date(a.metadata.due_datetime).getTime()
      const dateB = new Date(b.metadata.due_datetime).getTime()
      return dateA - dateB
    })

    // Calculate task statistics
    const stats = {
      total: assignments.length,
      completed: assignments.filter(a => a.metadata.status.value === 'Completed').length,
      pending: assignments.filter(a => a.metadata.status.value === 'Pending').length,
      rejected: assignments.filter(a => a.metadata.status.value === 'Rejected' || a.metadata.status.value === 'Failed').length,
    }

    return { assignments: sortedAssignments, stats }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        assignments: [],
        stats: { total: 0, completed: 0, pending: 0, rejected: 0 }
      }
    }
    throw error
  }
}

export default async function StaffDashboard() {
  const { assignments, stats } = await getStaffTasks()

  return (
    <StaffLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Tasks</h1>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-yellow-700">Pending</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-red-700">Rejected</div>
          </div>
        </div>
      </div>

      <StaffTasksList tasks={assignments} />
    </StaffLayout>
  )
}