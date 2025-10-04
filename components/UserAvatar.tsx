import { User } from '@/types'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

export default function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const sizeClass = sizeClasses[size]

  if (user.metadata.profile_photo) {
    return (
      <img 
        src={`${user.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
        alt={user.metadata.full_name}
        className={`${sizeClass} rounded-full object-cover`}
      />
    )
  }

  // Fallback to initials if no photo
  const initials = user.metadata.full_name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={`${sizeClass} rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold`}>
      {initials}
    </div>
  )
}