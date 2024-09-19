import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

const SeriesCard: React.FC<{ series: Series }> = ({ series }) => (
  <Card className="w-full max-w-2xl mx-auto mb-4 match-card">
    <CardHeader>
      <CardTitle>{series.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-2">
        {new Date(series.startDate).toLocaleDateString()} - {new Date(series.endDate).toLocaleDateString()}
      </p>
      <p className="mb-2">
        Matches: ODI ({series.odi}), T20 ({series.t20}), Test ({series.test})
      </p>
    </CardContent>
  </Card>
);

export default SeriesCard;