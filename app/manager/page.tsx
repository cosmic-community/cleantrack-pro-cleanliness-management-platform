import { cosmic, hasStatus } from '@/lib/cosmic'
import { TaskAssignment, User, DashboardStats, StaffPerformance } from '@/types'
import ManagerLayout from '@/components/ManagerLayout'
import DashboardOverview from '@/components/DashboardOverview'
import StaffPerformanceList from '@/components/StaffPerformanceList'

async function getDashboardData() {
  try {
    // Fetch all task assignments with depth=1 to get related objects
    const assignmentsResponse = await cosmic.objects
      .find({ type: 'task-assignments' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const assignments = assignmentsResponse.objects as TaskAssignment[]

    // Fetch all users
    const usersResponse = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const users = usersResponse.objects as User[]

    // Calculate dashboard statistics
    const stats: DashboardStats = {
      totalTasks: assignments.length,
      completedTasks: assignments.filter(a => a.metadata.status.value === 'Completed').length,
      pendingTasks: assignments.filter(a => a.metadata.status.value === 'Pending').length,
      failedTasks: assignments.filter(a => a.metadata.status.value === 'Failed' || a.metadata.status.value === 'Rejected').length,
      completionRate: 0,
    }

    if (stats.totalTasks > 0) {
      stats.completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100)
    }

    // Calculate staff performance
    const staffUsers = users.filter(u => u.metadata.role.value === 'Staff')
    const staffPerformance: StaffPerformance[] = staffUsers.map(user => {
      const userAssignments = assignments.filter(a => {
        const assignedTo = a.metadata.assigned_to as User
        return assignedTo.id === user.id
      })

      return {
        user,
        totalAssigned: userAssignments.length,
        completed: userAssignments.filter(a => a.metadata.status.value === 'Completed').length,
        pending: userAssignments.filter(a => a.metadata.status.value === 'Pending').length,
        failed: userAssignments.filter(a => a.metadata.status.value === 'Failed' || a.metadata.status.value === 'Rejected').length,
      }
    })

    return { stats, staffPerformance, assignments }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        stats: { totalTasks: 0, completedTasks: 0, pendingTasks: 0, failedTasks: 0, completionRate: 0 },
        staffPerformance: [],
        assignments: [],
      }
    }
    throw error
  }
}

export default async function ManagerDashboard() {
  const { stats, staffPerformance, assignments } = await getDashboardData()

  return (
    <ManagerLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor task completion and staff performance</p>
      </div>

      <DashboardOverview stats={stats} />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Staff Performance</h2>
        <StaffPerformanceList staffPerformance={staffPerformance} />
      </div>
    </ManagerLayout>
  )
}