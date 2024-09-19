'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Menu } from 'lucide-react'
import Facebook from 'lucide-react/dist/esm/icons/facebook'
import Twitter from 'lucide-react/dist/esm/icons/twitter'
import Instagram from 'lucide-react/dist/esm/icons/instagram'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import SeriesCard from '@/components/SeriesCard'
import CompactNewsCard from '@/components/CompactNewsCard'

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

export default function CricketWebsite() {
  const [matches, setMatches] = useState<Match[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCricketData = async () => {
      setIsLoading(true)
      try {
        const matchesRes = await fetch('/api/cricket?action=matches')
        const matchesData = await matchesRes.json()
        setMatches(matchesData.data || [])

        const seriesRes = await fetch('/api/cricket?action=series')
        const seriesData = await seriesRes.json()
        setSeries(seriesData.data || [])

        const newsRes = await fetch('/api/cricket?action=news')
        const newsData = await newsRes.json()
        setNews(newsData.data || [])
      } catch (error) {
        console.error('Error fetching cricket data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCricketData()
    const interval = setInterval(fetchCricketData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const displayedMatches = matches.slice(0, 4)
  const displayedSeries = series.slice(0, 4)
  const displayedNews = news.slice(0, 6) // Updated to show 6 news items

  return (
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

      <main className="flex-grow">
        <section className="bg-yellow-600 text-white py-20 bg-[url('https://t3.ftcdn.net/jpg/02/70/73/76/240_F_270737695_IaAkTD2p7vhmI5YNuYAGYlk2pGVwJUXS.jpg')] bg-cover bg-no-repeat bg-bottom">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to CricketZone</h1>
            <p className="text-xl mb-8">Your ultimate destination for live cricket scores, series info, and updates</p>
            <Link href="/auth">
              <Button size="lg" className="bg-white text-yellow-700 hover:bg-yellow-100 match-card">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-8 text-center">Live and Recent Matches</h2>
                {isLoading ? (
                  <p className="text-center">Loading matches...</p>
                ) : displayedMatches.length > 0 ? (
                  displayedMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))
                ) : (
                  <p className="text-center">No matches data available at the moment.</p>
                )}
                {matches.length > 4 && (
                  <div className="text-center mt-4">
                    <Link href="/all-matches">
                      <Button className='match-card'>Show More Matches</Button>
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center">Cricket News</h2>
                {isLoading ? (
                  <p className="text-center">Loading news...</p>
                ) : displayedNews.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {displayedNews.map((newsItem, index) => (
                      <CompactNewsCard key={index} news={newsItem} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center">No news available at the moment.</p>
                )}
                {news.length > 6 && (
                  <div className="text-center mt-4">
                    <Link href="/all-news">
                      <Button className='match-card'>Show More News</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Cricket Series</h2>
            <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All Series</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Series</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Cricket Series</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <p className="text-center">Loading series...</p>
                    ) : displayedSeries.length > 0 ? (
                      displayedSeries.map((s) => (
                        <SeriesCard key={s.id} series={s} />
                      ))
                    ) : (
                      <p className="text-center">No series data available at the moment.</p>
                    )}
                    {series.length > 4 && (
                      <div className="text-center mt-4">
                        <Link href="/all-series">
                          <Button className='match-card'>Show More Series</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Series</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <p className="text-center">Loading upcoming series...</p>
                    ) : displayedSeries.filter((s) => new Date(s.startDate) > new Date()).length > 0 ? (
                      displayedSeries
                        .filter((s) => new Date(s.startDate) > new Date())
                        .map((s) => (
                          <SeriesCard key={s.id} series={s} />
                        ))
                    ) : (
                      <p className="text-center">No upcoming series data available at the moment.</p>
                    )}
                    {series.filter((s) => new Date(s.startDate) > new Date()).length > 4 && (
                      <div className="text-center mt-4">
                        <Link href="/all-series?filter=upcoming">
                          <Button className='match-card'>Show More Upcoming Series</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="bg-yellow-800 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">CricketZone</h3>
            <p className="text-sm">Your ultimate cricket destination</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4 md:mb-0">
            <Link href="#" className="hover:text-black match-card1">About Us</Link>
            <Link href="#" className="hover:text-black match-card1">Contact</Link>
            <Link href="#" className="hover:text-black match-card1">Privacy Policy</Link>
            <Link href="#" className="hover:text-black match-card1">Terms of Service</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-black match-card1">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="hover:text-black match-card1">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="hover:text-black match-card1">
              <Instagram size={24} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}