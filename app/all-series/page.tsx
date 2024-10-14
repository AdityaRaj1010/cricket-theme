'use client'

import { useState, useEffect } from 'react'
import { Activity, Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import SeriesCard from '@/components/SeriesCard'
import { useSearchParams } from 'next/navigation'
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

export default function AllSeries() {
  const [series, setSeries] = useState<Series[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/cricket?action=series')
        const data = await res.json()
        setSeries(data.data || [])
      } catch (error) {
        console.error('Error fetching series:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSeries()
  }, [])

  const filteredSeries = filter === 'upcoming'
    ? series.filter((s) => new Date(s.startDate) > new Date())
    : series

  return (
    <AnimatedLayout>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-yellow-700 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Activity size={24} />
              <span className="text-xl font-bold">CricketCollectors</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="hover:text-black match-card1">Home</Link>
              <Link href="/all-matches" className="hover:text-black match-card1">Matches</Link>
              <Link href="/all-series" className="hover:text-black match-card1">Series</Link>
              <Link href="/all-news" className="hover:text-black match-card1">News</Link>
            </nav>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="flex-grow container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {filter === 'upcoming' ? 'Upcoming Series' : 'All Series'}
          </h1>
          {isLoading ? (
            <p className="text-center">Loading series...</p>
          ) : filteredSeries.length > 0 ? (
            filteredSeries.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))
          ) : (
            <p className="text-center">No series data available at the moment.</p>
          )}
        </main>

        <footer className="bg-yellow-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2023 CricketCollectors. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AnimatedLayout>
  )
}
