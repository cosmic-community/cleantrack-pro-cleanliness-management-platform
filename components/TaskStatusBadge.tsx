import { TaskStatus } from '@/types'

interface TaskStatusBadgeProps {
  status: TaskStatus
}

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const statusConfig = {
    'Pending': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: '⏳'
    },
    'Completed': {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: '✅'
    },
    'Failed': {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: '❌'
    },
    'Rejected': {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      icon: '⚠️'
    }
  }

  const config = statusConfig[status] || statusConfig['Pending']

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span>{config.icon}</span>
      <span>{status}</span>
    </span>
  )
}