'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SeriesCard from '@/components/SeriesCard';

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

export default function AllSeriesClient() {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/cricket?action=series');
        const data = await res.json();
        setSeries(data.data || []);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const filteredSeries = filter === 'upcoming'
    ? series.filter((s) => new Date(s.startDate) > new Date())
    : series;

  return (
    <div>
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
    </div>
  );
}

