import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

const renderScore = (score: Match['score'][string]) => {
  if (Array.isArray(score)) {
    return score.map((inning, index) => (
      <span key={index} className="ml-2">
        {inning.r}/{inning.w} ({inning.o})
      </span>
    ));
  } else if (score && typeof score === 'object') {
    return (
      <span className="ml-2">
        {score.r}/{score.w} ({score.o})
      </span>
    );
  }
  return null;
};

const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <Card className="w-full max-w-2xl mx-auto mb-4 match-card">
    <CardHeader>
      <CardTitle>{match.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-2">{match.status}</p>
      <p className="mb-2">Venue: {match.venue}</p>
      <p className="mb-4">Date: {new Date(match.dateTimeGMT).toLocaleString()}</p>
      {match.score && Object.entries(match.score).map(([team, innings]) => (
        <div key={team} className="mb-2">
          <strong>{team}:</strong>
          {renderScore(innings)}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default MatchCard;
