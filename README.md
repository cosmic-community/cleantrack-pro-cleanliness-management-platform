# CleanTrack Pro - Cleanliness Management Platform

![App Preview](https://imgix.cosmicjs.com/478275d0-a116-11f0-bba7-d56988718db7-photo-1560250097-0b93528c311a-1759577731190.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive cleanliness tracking and management platform built with Next.js 15 and Cosmic CMS. Features dual-interface design for managers (desktop) and staff (mobile), with real-time task tracking, photo proof submission, and AI-powered reporting.

## ✨ Features

- **Dual-Interface Design**: Manager dashboard (desktop) and staff task view (mobile-optimized)
- **Task Management**: Create, assign, and track cleaning tasks with customizable deadlines
- **Proof Documentation**: Timestamped photo uploads for task completion verification
- **Status Tracking**: Real-time task status updates (Pending, Completed, Failed, Rejected)
- **Performance Analytics**: Staff performance monitoring with completion/failure statistics
- **Smart Reporting**: Weekly and monthly reports with AI-powered improvement suggestions
- **Communication System**: Built-in messaging between managers and staff
- **Category Organization**: Tasks organized by area (Kitchen, Dining, Restrooms, etc.)
- **Review Workflow**: Manager approval/rejection system with feedback mechanism
- **Responsive Design**: Optimized for both desktop management and mobile task execution

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e0fd70260d9dd939d1bb0f&clone_repository=68e10857260d9dd939d1bb73)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a Cleanliness Tracker Web & Mobile App with two types of logins:
> 
> Manager Login (desktop view)
> 
> Staff Login (mobile view)
> 
> Login
> 
> Option to sign in as Manager or Staff.
> 
> Managers see the desktop dashboard.
> 
> Staff see the mobile task app.
> 
> Manager Dashboard (Desktop Frame)
> 
> Should look like the designs I provided. Features include:
> 
> Overview Page
> 
> Circular chart showing Task Overview: Completed, Pending, Failed (with % breakdown).
> 
> List of staff with their task status (Completed / Pending / Failed counts).
> 
> Failed Tasks Page
> 
> List of failed tasks with:
> 
> Task name (e.g., Dish Washing Area, Unclean Utensils).
> 
> Staff name & timestamp.
> 
> Reason field (reason provided by staff).
> 
> Buttons to View Photo, Approve, or Reject.
> 
> Cleanliness Reports Page
> 
> Weekly and Monthly reports.
> 
> Ability to View Score and Download Report.
> 
> Section for AI Suggestions for Improvement.
> 
> Navigation Sidebar
> 
> Overview
> 
> Assign New Task
> 
> Cleanliness Report
> 
> Messages
> 
> Settings
> 
> Staff Dashboard (Mobile Frame)
> 
> Should look like the mobile design I provided. Features include:
> 
> Task List (Daily View)
> 
> Shows number of Completed, Pending, and Rejected tasks.
> 
> Each task card shows:
> 
> Task name (e.g., Kitchen Surface Cleaning).
> 
> Status (Pending / Completed / Rejected).
> 
> Buttons: Take Photo, Completed, Retake Photo, Provide Reason (when rejected).
> 
> Deadline time for each task.
> 
> Task Flow
> 
> Staff can mark tasks completed with or without proof.
> 
> For proof-required tasks, they must upload a timestamped photo.
> 
> Rejected tasks show reason and option to re-upload photo.
> 
> General Requirements
> 
> Cloud storage for approved images (for audits).
> 
> AI/ML integration (later) for automatic verification of cleanliness from photos.
> 
> Reports auto-generate weekly/monthly with AI-powered improvement tips.
> 
> create the assign a new task section also. and also allow the manager to view what are the pending tasks, completed tasks by clicking on them in the overview section"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **CMS**: Cosmic CMS
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: Custom React components
- **Charts**: Recharts for data visualization
- **Image Handling**: Imgix optimization
- **Authentication**: Built-in user role management
- **Package Manager**: Bun

## 📋 Prerequisites

- Node.js 18+ or Bun
- Cosmic account with bucket access
- Read and Write API keys from Cosmic

## 🚀 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

### 3. Run Development Server

```bash
bun run dev
```

Visit `http://localhost:3000` to see the application.

## 📚 Cosmic SDK Examples

### Fetching Tasks with Assignments

```typescript
// Get all tasks with their details
const tasks = await cosmic.objects
  .find({ type: 'tasks' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(0);

// Get task assignments with related task and user data
const assignments = await cosmic.objects
  .find({ type: 'task-assignments' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1); // depth=1 includes nested task and user objects
```

### Creating Task Assignments

```typescript
// Assign a task to a staff member
await cosmic.objects.insertOne({
  type: 'task-assignments',
  title: `${taskName} - ${staffName}`,
  metadata: {
    task: taskId,
    assigned_to: staffUserId,
    assigned_by: managerUserId,
    assignment_date: '2024-01-15',
    due_datetime: '2024-01-15 14:00',
    status: 'Pending'
  }
});
```

### Updating Task Status

```typescript
// Update task assignment status (only changed fields)
await cosmic.objects.updateOne(assignmentId, {
  metadata: {
    status: 'Completed',
    completion_timestamp: new Date().toISOString()
  }
});
```

### Generating Reports

```typescript
// Create weekly/monthly report
await cosmic.objects.insertOne({
  type: 'reports',
  title: 'Weekly Report - Week 3 January 2024',
  metadata: {
    report_type: 'Weekly',
    report_period: 'Week 3, January 2024',
    start_date: '2024-01-15',
    end_date: '2024-01-21',
    overall_score: 92,
    total_tasks_assigned: 48,
    tasks_completed: 44,
    tasks_failed: 2,
    tasks_pending: 2,
    ai_suggestions: 'Performance analysis and recommendations...',
    generated_by: managerUserId
  }
});
```

## 🔗 Cosmic CMS Integration

This application uses Cosmic CMS as the backend with the following object types:

- **Users**: Manager and staff user profiles with authentication
- **Tasks**: Master task definitions with categories and requirements
- **Task Assignments**: Individual task instances assigned to staff
- **Messages**: Communication between managers and staff
- **Reports**: Weekly and monthly performance reports

All data is managed through Cosmic's REST API with proper type safety and validation.

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy with Vercel" button
2. Add your Cosmic environment variables
3. Deploy

### Environment Variables for Production

Set these in your hosting platform:

- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `COSMIC_READ_KEY`: Your Cosmic read key
- `COSMIC_WRITE_KEY`: Your Cosmic write key

## 📱 Usage

### Manager Workflow

1. **Login**: Sign in with manager credentials
2. **Dashboard Overview**: View task completion statistics and staff performance
3. **Assign Tasks**: Create new task assignments for staff members
4. **Review Tasks**: Approve or reject completed tasks with photo proof
5. **View Reports**: Access weekly/monthly reports with AI suggestions
6. **Messaging**: Communicate with staff about tasks and schedules

### Staff Workflow

1. **Login**: Sign in with staff credentials
2. **Task List**: View assigned tasks with status and deadlines
3. **Complete Tasks**: Mark tasks as completed with optional photo proof
4. **Photo Upload**: Capture timestamped photos for proof-required tasks
5. **Handle Rejections**: Review rejection reasons and resubmit with corrections
6. **Messages**: View manager feedback and respond to task-related queries

## 🤝 Contributing

This is a demonstration application built with Cosmic CMS. Feel free to fork and customize for your specific needs.

## 📄 License

MIT

<!-- README_END -->