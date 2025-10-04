import { TaskCategory } from '@/types'

interface CategoryBadgeProps {
  category: TaskCategory
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const categoryConfig: Record<TaskCategory, { bg: string; text: string; icon: string }> = {
    'Kitchen': {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: '🍳'
    },
    'Dining Area': {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: '🍽️'
    },
    'Restrooms': {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      icon: '🚽'
    },
    'Common Areas': {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: '🏢'
    },
    'Outdoor Spaces': {
      bg: 'bg-cyan-100',
      text: 'text-cyan-700',
      icon: '🌳'
    },
    'Storage Areas': {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      icon: '📦'
    }
  }

  const config = categoryConfig[category] || categoryConfig['Common Areas']

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}>
      <span>{config.icon}</span>
      <span>{category}</span>
    </span>
  )
}