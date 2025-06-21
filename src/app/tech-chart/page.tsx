import TechnologyChart from '@/components/TechnologyChart'

export default function TechChartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Technology Stack Overview</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <TechnologyChart />
          </div>
        </div>
      </div>
    </div>
  )
}