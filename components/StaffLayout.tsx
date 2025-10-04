import Link from 'next/link'

interface StaffLayoutProps {
  children: React.ReactNode
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">CleanTrack Pro</h1>
            <p className="text-xs text-gray-600">Staff Dashboard</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>
    </div>
  )
}