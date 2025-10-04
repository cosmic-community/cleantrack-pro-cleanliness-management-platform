import { StaffPerformance } from '@/types'

interface StaffPerformanceListProps {
  staffPerformance: StaffPerformance[]
}

export default function StaffPerformanceList({ staffPerformance }: StaffPerformanceListProps) {
  if (staffPerformance.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-gray-400 text-4xl mb-2">👥</div>
        <p className="text-gray-600">No staff members found</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staffPerformance.map((staff) => (
        <div key={staff.user.id} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            {staff.user.metadata.profile_photo && (
              <img 
                src={`${staff.user.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={staff.user.metadata.full_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{staff.user.metadata.full_name}</h3>
              <p className="text-sm text-gray-600">{staff.user.metadata.role.value}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Assigned</span>
              <span className="font-semibold text-gray-900">{staff.totalAssigned}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Completed</span>
              <span className="font-semibold text-green-600">{staff.completed}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-600">Pending</span>
              <span className="font-semibold text-yellow-600">{staff.pending}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">Failed</span>
              <span className="font-semibold text-red-600">{staff.failed}</span>
            </div>
          </div>

          {staff.totalAssigned > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((staff.completed / staff.totalAssigned) * 100)}%
                </div>
                <div className="text-xs text-gray-600">Completion Rate</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}