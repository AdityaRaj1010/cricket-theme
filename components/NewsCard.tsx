import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <AnimatedLayout>
    <Card className="h-full flex flex-col match-card">
      <CardHeader>
        <CardTitle className="text-lg">{news.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {news.urlToImage && (
          <img src={news.urlToImage} alt={news.title} className="w-full h-40 object-cover mb-4 rounded" />
        )}
        <p className="text-sm text-gray-600 mb-4">{news.description}</p>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{news.source.name}</span>
            <span>{new Date(news.publishedAt).toLocaleString()}</span>
          </div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm inline-block"
          >
            Read more
          </a>
        </div>
      </CardContent>
    </Card>
    </AnimatedLayout>
  )
}
