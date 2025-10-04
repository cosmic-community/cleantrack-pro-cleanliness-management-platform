'use client'

import { useState } from 'react'
import { Task, User } from '@/types'

interface AssignTaskFormProps {
  tasks: Task[]
  staffUsers: User[]
}

export default function AssignTaskForm({ tasks, staffUsers }: AssignTaskFormProps) {
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [selectedStaff, setSelectedStaff] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [dueTime, setDueTime] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // In a real application, this would call an API endpoint
      // For now, we'll show a success message
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage({ type: 'success', text: 'Task assigned successfully!' })
      
      // Reset form
      setSelectedTask('')
      setSelectedStaff('')
      setDueDate('')
      setDueTime('')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to assign task. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const selectedTaskData = tasks.find(t => t.id === selectedTask)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
          Select Task
        </label>
        <select
          id="task"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a task...</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.metadata.task_name} - {task.metadata.category.value}
            </option>
          ))}
        </select>
      </div>

      {selectedTaskData && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Task Details</h4>
          <p className="text-sm text-blue-700 mb-2">{selectedTaskData.metadata.description}</p>
          <div className="flex items-center gap-4 text-sm text-blue-700">
            <div>
              <span className="font-medium">Category:</span> {selectedTaskData.metadata.category.value}
            </div>
            <div>
              <span className="font-medium">Requires Proof:</span> {selectedTaskData.metadata.requires_proof ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="staff" className="block text-sm font-medium text-gray-700 mb-2">
          Assign To
        </label>
        <select
          id="staff"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose staff member...</option>
          {staffUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.metadata.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-2">
            Due Time
          </label>
          <input
            type="time"
            id="dueTime"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Assigning...' : 'Assign Task'}
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedTask('')
            setSelectedStaff('')
            setDueDate('')
            setDueTime('')
            setMessage(null)
          }}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Clear
        </button>
      </div>
    </form>
  )
}