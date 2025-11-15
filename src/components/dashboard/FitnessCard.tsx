import { Activity, TrendingUp, Flame, Footprints } from 'lucide-react';
import { toast } from 'sonner';

const FitnessCard = () => {
  // Mock demo data (UI only)
  const fitnessData = {
    steps: 4500,
    calories: 220,
    distance: 3.4,
  };

  const handleConnectGoogleFit = () => {
    toast.info(
      'Google Fit integration coming soon! This will sync your daily steps, calories, and activities.'
    );
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Fitness Tracking
        </h3>
        <p className="text-sm text-muted-foreground">
          Monitor your daily activity and health metrics
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-4">
          {/* Show mock demo UI */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <Footprints className="h-6 w-6 mx-auto mb-1 text-primary" />
                <div className="text-2xl font-bold">{fitnessData.steps}</div>
                <div className="text-xs text-muted-foreground">Steps</div>
              </div>

              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <Flame className="h-6 w-6 mx-auto mb-1 text-accent" />
                <div className="text-2xl font-bold">{fitnessData.calories}</div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </div>

              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-1 text-secondary" />
                <div className="text-2xl font-bold">{fitnessData.distance}</div>
                <div className="text-xs text-muted-foreground">km</div>
              </div>
            </div>

            <button
              onClick={handleConnectGoogleFit}
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Sync with Google Fit
            </button>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Tip:</strong> Keep moving! Aim for 10,000 steps daily to
              maintain good health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessCard;
