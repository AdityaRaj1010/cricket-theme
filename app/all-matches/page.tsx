'use client'

import { useState, useEffect } from 'react'
import { Activity, Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import MatchCard from '@/components/MatchCard'
import AnimatedLayout from '@/components/AnimatedLayout'

interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score: {
    [key: string]: {
      inning: string;
      r: number;
      w: number;
      o: number;
    } | {
      inning: string;
      r: number;
      w: number;
      o: number;
    }[];
  };
}

export default function AllMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/cricket?action=matches')
        const data = await res.json()
        setMatches(data.data || [])
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

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
          <h1 className="text-3xl font-bold mb-8 text-center">All Matches</h1>
          {isLoading ? (
            <p className="text-center">Loading matches...</p>
          ) : matches.length > 0 ? (
            matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <p className="text-center">No matches data available at the moment.</p>
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
