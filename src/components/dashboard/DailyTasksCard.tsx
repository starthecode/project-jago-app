import { Calendar } from 'lucide-react';
// import { supabase } from "@/integrations/supabase/client";

const DailyTasksCard = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Today's Wellness Tasks
        </h3>
        <p className="text-sm text-muted-foreground">
          Daily health challenges from your admin
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="font-semibold mb-1">No tasks for today</p>
          <p className="text-sm">
            Your admin hasn't posted any wellness tasks yet. Check back later!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyTasksCard;
