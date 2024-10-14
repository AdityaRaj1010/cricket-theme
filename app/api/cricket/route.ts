import { NextResponse } from 'next/server';

const CRICKET_API_KEY = process.env.CRICKET_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CRICKET_BASE_URL = 'https://api.cricapi.com/v1';
const NEWS_BASE_URL = 'https://newsapi.org/v2';

interface CacheItem {
  data: unknown;
  timestamp: number;
}

interface Article {
  title: string;
  description: string;
  url: string;
}

interface ApiResponse {
  status: string;
  data: unknown[];
  articles: Article[];
}

const cache: { [key: string]: CacheItem } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchFromCricketAPI(endpoint: string): Promise<ApiResponse> {
  const url = `${CRICKET_BASE_URL}/${endpoint}?apikey=${CRICKET_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}

async function fetchFromNewsAPI(): Promise<unknown> {
  const url = `${NEWS_BASE_URL}/everything?q=cricket&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  const data = await res.json();
  
  // Filter articles to ensure they are cricket-related
  const cricketKeywords = ['cricket', 'ipl', 'test match', 'odi', 't20', 'bcci', 'icc'];
  const filteredArticles = data.articles.filter((article: Article) =>  
    cricketKeywords.some(keyword => 
      article.title.toLowerCase().includes(keyword) || 
      (article.description && article.description.toLowerCase().includes(keyword)) // Check for description existence
    )
  );

  return { ...data, articles: filteredArticles };
}

async function getCachedData(key: string, fetchFunction: () => Promise<unknown>): Promise<unknown> {
  const now = Date.now();
  if (cache[key] && now - cache[key].timestamp < CACHE_DURATION) {
    return cache[key].data;
  }

  const data = await fetchFunction();
  cache[key] = { data, timestamp: now };
  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    let data: unknown;
    switch (action) { 
      case 'matches':
        data = await getCachedData('matches', () => fetchFromCricketAPI('matches'));
        break;
      case 'series':
        data = await getCachedData('series', () => fetchFromCricketAPI('series'));
        break;
      case 'news':
        data = await getCachedData('news', fetchFromNewsAPI);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    if (action === 'news') {
      const newsData = data as { articles: unknown[] }; // Assert the type
      return NextResponse.json({ data: newsData.articles || [] });
    } else if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data: unknown[] }).data)) {
      return NextResponse.json({ data: (data as { data: unknown[] }).data });
    } else {
      console.error('Unexpected API response structure:', data);
      return NextResponse.json({ error: 'Unexpected API response structure' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
