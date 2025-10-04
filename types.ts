// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
}

// User type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    username: string;
    password_hash: string;
    email: string;
    role: {
      key: 'manager' | 'staff';
      value: 'Manager' | 'Staff';
    };
    full_name: string;
    phone_number?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    active_status: boolean;
  };
}

// Task type
export interface Task extends CosmicObject {
  type: 'tasks';
  metadata: {
    task_name: string;
    description?: string;
    category: {
      key: string;
      value: string;
    };
    requires_proof: boolean;
    default_deadline_hours?: number;
    checklist_items?: string[];
  };
}

// Task Assignment type
export interface TaskAssignment extends CosmicObject {
  type: 'task-assignments';
  metadata: {
    task: Task | string;
    assigned_to: User | string;
    assigned_by: User | string;
    assignment_date: string;
    due_datetime: string;
    status: {
      key: 'pending' | 'completed' | 'failed' | 'rejected';
      value: 'Pending' | 'Completed' | 'Failed' | 'Rejected';
    };
    completion_timestamp?: string;
    proof_photo?: {
      url: string;
      imgix_url: string;
    };
    reason?: string;
    reviewed_by?: User | string;
    review_timestamp?: string;
  };
}

// Message type
export interface Message extends CosmicObject {
  type: 'messages';
  metadata: {
    from_user: User | string;
    to_user: User | string;
    message_content: string;
    timestamp: string;
    read_status: boolean;
    related_task?: TaskAssignment | string;
  };
}

// Report type
export interface Report extends CosmicObject {
  type: 'reports';
  metadata: {
    report_type: {
      key: 'weekly' | 'monthly';
      value: 'Weekly' | 'Monthly';
    };
    report_period: string;
    start_date: string;
    end_date: string;
    overall_score: number;
    total_tasks_assigned: number;
    tasks_completed: number;
    tasks_failed: number;
    tasks_pending: number;
    ai_suggestions?: string;
    report_file?: {
      url: string;
      imgix_url: string;
    };
    generated_by?: User | string;
  };
}

// Type literals for status values
export type TaskStatus = 'Pending' | 'Completed' | 'Failed' | 'Rejected';
export type UserRole = 'Manager' | 'Staff';
export type ReportType = 'Weekly' | 'Monthly';
export type TaskCategory = 'Kitchen' | 'Dining Area' | 'Restrooms' | 'Common Areas' | 'Outdoor Spaces' | 'Storage Areas';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Dashboard statistics
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  failedTasks: number;
  completionRate: number;
}

// Staff performance
export interface StaffPerformance {
  user: User;
  totalAssigned: number;
  completed: number;
  pending: number;
  failed: number;
}

// Type guards
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isTask(obj: CosmicObject): obj is Task {
  return obj.type === 'tasks';
}

export function isTaskAssignment(obj: CosmicObject): obj is TaskAssignment {
  return obj.type === 'task-assignments';
}

export function isMessage(obj: CosmicObject): obj is Message {
  return obj.type === 'messages';
}

export function isReport(obj: CosmicObject): obj is Report {
  return obj.type === 'reports';
}