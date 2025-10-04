import { cosmic, hasStatus } from '@/lib/cosmic'
import { Report } from '@/types'
import ManagerLayout from '@/components/ManagerLayout'
import ReportsList from '@/components/ReportsList'

async function getReports() {
  try {
    const response = await cosmic.objects
      .find({ type: 'reports' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const reports = response.objects as Report[]
    
    // Sort by date (newest first)
    const sortedReports = reports.sort((a, b) => {
      const dateA = new Date(a.metadata.start_date).getTime()
      const dateB = new Date(b.metadata.start_date).getTime()
      return dateB - dateA
    })

    return sortedReports
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function ReportsPage() {
  const reports = await getReports()

  return (
    <ManagerLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cleanliness Reports</h1>
        <p className="text-gray-600">Weekly and monthly performance analytics</p>
      </div>

      <ReportsList reports={reports} />
    </ManagerLayout>
  )
}