import Link from 'next/link'

interface ManagerLayoutProps {
  children: React.ReactNode
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">CleanTrack Pro</h2>
            <p className="text-sm text-gray-600">Manager Dashboard</p>
          </div>
          
          <nav className="px-4 space-y-2">
            <Link 
              href="/manager"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">📊</span>
              <span className="font-medium">Overview</span>
            </Link>
            
            <Link 
              href="/manager/assign-task"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">➕</span>
              <span className="font-medium">Assign Task</span>
            </Link>
            
            <Link 
              href="/manager/failed-tasks"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">⚠️</span>
              <span className="font-medium">Failed Tasks</span>
            </Link>
            
            <Link 
              href="/manager/reports"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">📈</span>
              <span className="font-medium">Reports</span>
            </Link>
            
            <Link 
              href="/manager/messages"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">💬</span>
              <span className="font-medium">Messages</span>
            </Link>
          </nav>

          <div className="absolute bottom-0 left-0 w-64 p-4">
            <Link 
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">🏠</span>
              <span className="font-medium">Home</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}