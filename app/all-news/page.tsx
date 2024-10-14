'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Activity, Menu } from 'lucide-react'
import Link from 'next/link'
import NewsCard from '@/components/NewsCard'
import AnimatedLayout from '@/components/AnimatedLayout'

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function AllNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/cricket?action=news')
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setNews(data.data || [])
      } catch (err) {
        setError('Failed to fetch news. Please try again later.')
        console.error('Error fetching news:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <AnimatedLayout>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-yellow-700 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Activity size={24} />
              <span className="text-xl font-bold">CricketZone</span>
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
          <h1 className="text-3xl font-bold mb-8 text-center">All Cricket News</h1>
          {isLoading ? (
            <div className="text-center">
              <p>Loading news...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((newsItem, index) => (
                <NewsCard key={index} news={newsItem} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>No news available at the moment.</p>
            </div>
          )}
        </main>

        <footer className="bg-yellow-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2023 CricketZone. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AnimatedLayout>
  )
}
