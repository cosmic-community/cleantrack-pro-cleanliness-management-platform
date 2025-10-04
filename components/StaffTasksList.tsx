import { TaskAssignment, Task, User } from '@/types'

interface StaffTasksListProps {
  tasks: TaskAssignment[]
}

export default function StaffTasksList({ tasks }: StaffTasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-gray-400 text-4xl mb-2">📋</div>
        <p className="text-gray-600">No tasks assigned yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((assignment) => {
        const task = assignment.metadata.task as Task
        const assignedBy = assignment.metadata.assigned_by as User

        let statusColor = 'bg-yellow-50 border-yellow-200 text-yellow-700'
        let statusIcon = '⏳'
        
        if (assignment.metadata.status.value === 'Completed') {
          statusColor = 'bg-green-50 border-green-200 text-green-700'
          statusIcon = '✅'
        } else if (assignment.metadata.status.value === 'Failed' || assignment.metadata.status.value === 'Rejected') {
          statusColor = 'bg-red-50 border-red-200 text-red-700'
          statusIcon = '❌'
        }

        return (
          <div key={assignment.id} className={`bg-white rounded-lg shadow-md border-2 ${statusColor}`}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{statusIcon}</span>
                    <h3 className="font-semibold text-gray-900">{task.metadata.task_name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.metadata.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {task.metadata.category.value}
                    </span>
                    <span>Due: {assignment.metadata.due_datetime}</span>
                  </div>
                </div>
              </div>

              <div className={`px-3 py-2 rounded-lg ${statusColor}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status: {assignment.metadata.status.value}</span>
                  {assignment.metadata.completion_timestamp && (
                    <span className="text-xs">
                      Completed: {assignment.metadata.completion_timestamp}
                    </span>
                  )}
                </div>
              </div>

              {assignment.metadata.reason && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-900 mb-1">Rejection Reason:</div>
                  <p className="text-sm text-red-700">{assignment.metadata.reason}</p>
                </div>
              )}

              {assignment.metadata.proof_photo && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">Proof Photo:</div>
                  <img 
                    src={`${assignment.metadata.proof_photo.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt="Task proof"
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
              )}

              {task.metadata.requires_proof && assignment.metadata.status.value === 'Pending' && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <span>📸</span>
                    <span>Photo proof required for completion</span>
                  </div>
                </div>
              )}

              {task.metadata.checklist_items && task.metadata.checklist_items.length > 0 && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 mb-2">Checklist:</div>
                  <ul className="space-y-1">
                    {task.metadata.checklist_items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="text-gray-400">□</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}