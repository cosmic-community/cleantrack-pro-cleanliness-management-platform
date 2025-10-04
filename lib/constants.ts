import { TaskCategory } from '@/types'

export const TASK_CATEGORIES: TaskCategory[] = [
  'Kitchen',
  'Dining Area',
  'Restrooms',
  'Common Areas',
  'Outdoor Spaces',
  'Storage Areas'
]

export const TASK_STATUSES = [
  'Pending',
  'Completed',
  'Failed',
  'Rejected'
] as const

export const USER_ROLES = [
  'Manager',
  'Staff'
] as const

export const REPORT_TYPES = [
  'Weekly',
  'Monthly'
] as const

export const DEFAULT_DEADLINE_HOURS = 2

export const MAX_PHOTO_SIZE_MB = 10

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
]