'use client'

import { DashboardStats } from '@/types'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

interface DashboardOverviewProps {
  stats: DashboardStats
}

export default function DashboardOverview({ stats }: DashboardOverviewProps) {
  const chartData = [
    { name: 'Completed', value: stats.completedTasks, color: '#10b981' },
    { name: 'Pending', value: stats.pendingTasks, color: '#f59e0b' },
    { name: 'Failed', value: stats.failedTasks, color: '#ef4444' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Statistics Cards */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <div className="text-sm text-green-700 font-medium">Completed</div>
              <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
            </div>
            <div className="text-3xl">✅</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <div className="text-sm text-yellow-700 font-medium">Pending</div>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</div>
            </div>
            <div className="text-3xl">⏳</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <div className="text-sm text-red-700 font-medium">Failed</div>
              <div className="text-2xl font-bold text-red-600">{stats.failedTasks}</div>
            </div>
            <div className="text-3xl">❌</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <div className="text-sm text-blue-700 font-medium">Total Tasks</div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalTasks}</div>
            </div>
            <div className="text-3xl">📋</div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h3>
        <div className="flex flex-col items-center">
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}