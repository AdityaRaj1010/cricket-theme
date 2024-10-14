import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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

interface MatchDetailsProps {
  match: Match;
  isOpen: boolean;
  onClose: () => void;
}

export function MatchDetailsModal({ match, isOpen, onClose }: MatchDetailsProps) {
  return (
    <AnimatedLayout>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{match.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{match.status}</p>
          </div>
          <div>
            <h3 className="font-semibold">Venue</h3>
            <p>{match.venue}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date</h3>
            <p>{new Date(match.dateTimeGMT).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Teams</h3>
            <p>{match.teams.join(' vs ')}</p>
          </div>
          {match.score && (
            <div>
              <h3 className="font-semibold">Score</h3>
              {Object.entries(match.score).map(([team, score]) => (
                <p key={team}>
                  {team}: {Array.isArray(score) 
                    ? score.map(s => `${s.r}/${s.w} (${s.o})`).join(', ')
                    : `${score.r}/${score.w} (${score.o})`
                  }
                </p>
              ))}
            </div>
          )}
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
    </AnimatedLayout>
  )
}
