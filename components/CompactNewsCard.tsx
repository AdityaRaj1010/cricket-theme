import { Card, CardContent } from "@/components/ui/card"

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

export default function CompactNewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="mb-4 overflow-hidden match-card">
      <CardContent className="p-4 flex items-start space-x-4">
        {news.urlToImage && (
          <img src={news.urlToImage} alt={news.title} className="w-24 h-24 object-cover rounded"/>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold mb-1 truncate">{news.title}</h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{news.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{news.source.name}</span>
            <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}