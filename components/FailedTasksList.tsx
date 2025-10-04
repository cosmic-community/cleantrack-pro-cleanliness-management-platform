import { TaskAssignment, Task, User } from '@/types'

interface FailedTasksListProps {
  tasks: TaskAssignment[]
}

export default function FailedTasksList({ tasks }: FailedTasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-green-400 text-4xl mb-2">✅</div>
        <p className="text-gray-600">No failed tasks - great work!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((assignment) => {
        const task = assignment.metadata.task as Task
        const assignedTo = assignment.metadata.assigned_to as User
        const reviewedBy = assignment.metadata.reviewed_by as User | undefined

        return (
          <div key={assignment.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.metadata.task_name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assignment.metadata.status.value === 'Failed' 
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {assignment.metadata.status.value}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.metadata.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Staff:</span> {assignedTo.metadata.full_name}
                  </div>
                  {assignment.metadata.completion_timestamp && (
                    <div>
                      <span className="font-medium">Completed:</span> {assignment.metadata.completion_timestamp}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {assignment.metadata.reason && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-medium text-red-900 mb-1">Failure Reason:</div>
                <p className="text-sm text-red-700">{assignment.metadata.reason}</p>
              </div>
            )}

            {assignment.metadata.proof_photo && (
              <div className="mb-4">
                <div className="font-medium text-gray-900 mb-2">Proof Photo:</div>
                <img 
                  src={`${assignment.metadata.proof_photo.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt="Task proof"
                  className="w-full max-w-md rounded-lg shadow-md"
                />
              </div>
            )}

            {reviewedBy && assignment.metadata.review_timestamp && (
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <span className="font-medium">Reviewed by:</span> {reviewedBy.metadata.full_name} 
                <span className="mx-2">•</span>
                {assignment.metadata.review_timestamp}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}