import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { SeriesDetailsModal } from './SeriesDetailsModal'
import AnimatedLayout from '@/components/AnimatedLayout'

interface Series {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

export default function SeriesCard({ series }: { series: Series }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <AnimatedLayout>
    <>
      <Card className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setIsModalOpen(true)}>
        <CardContent className="pt-6">
          <h3 className="font-semibold">{series.name}</h3>
          <p className="text-sm text-gray-600">
            {new Date(series.startDate).toLocaleDateString()} - {new Date(series.endDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Matches: ODI ({series.odi}), T20 ({series.t20}), Test ({series.test})
          </p>
        </CardContent>
      </Card>
      <SeriesDetailsModal series={series} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
    </AnimatedLayout>
  )
}
