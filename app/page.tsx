import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              CleanTrack Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Cleanliness Management Platform
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <img 
              src="https://imgix.cosmicjs.com/478275d0-a116-11f0-bba7-d56988718db7-photo-1560250097-0b93528c311a-1759577731190.jpg?w=800&h=400&fit=crop&auto=format,compress"
              alt="CleanTrack Pro Dashboard"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-gray-700 text-lg mb-6">
              Professional cleanliness tracking and management solution for facilities teams. 
              Streamline task assignments, monitor performance, and maintain high standards 
              with intelligent reporting and real-time tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link 
              href="/manager"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-8 transition-colors duration-200 group"
            >
              <div className="text-4xl mb-4">👔</div>
              <h2 className="text-2xl font-bold mb-2">Manager Dashboard</h2>
              <p className="text-blue-100">
                Desktop interface for task management, staff oversight, and reporting
              </p>
              <div className="mt-4 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200 inline-block">
                Access Dashboard →
              </div>
            </Link>

            <Link 
              href="/staff"
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-8 transition-colors duration-200 group"
            >
              <div className="text-4xl mb-4">📱</div>
              <h2 className="text-2xl font-bold mb-2">Staff Tasks</h2>
              <p className="text-green-100">
                Mobile-optimized interface for task completion and photo proof submission
              </p>
              <div className="mt-4 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200 inline-block">
                View Tasks →
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="font-medium text-gray-900 mb-1">📊 Smart Analytics</div>
                <div>Real-time performance tracking and insights</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">📸 Photo Proof</div>
                <div>Timestamped documentation for accountability</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">🤖 AI Suggestions</div>
                <div>Intelligent recommendations for improvement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}