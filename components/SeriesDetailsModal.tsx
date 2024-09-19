import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

interface SeriesDetailsProps {
  series: Series;
  isOpen: boolean;
  onClose: () => void;
}

export function SeriesDetailsModal({ series, isOpen, onClose }: SeriesDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{series.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Date Range</h3>
            <p>{new Date(series.startDate).toLocaleDateString()} - {new Date(series.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Matches</h3>
            <p>ODI: {series.odi}, T20: {series.t20}, Test: {series.test}</p>
          </div>
          <div>
            <h3 className="font-semibold">Total Matches</h3>
            <p>{series.matches}</p>
          </div>
          <div>
            <h3 className="font-semibold">Squads</h3>
            <p>{series.squads}</p>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}