import { Clock, CheckCircle, Activity } from 'lucide-react';
import AttendanceCard from '../components/dashboard/AttendanceCard';
import FitnessCard from '../components/dashboard/FitnessCard';
import DailyTasksCard from '../components/dashboard/DailyTasksCard';
import DashHead from '../components/dashboard/header/Head';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Dashboard = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  console.log('currentUser', currentUser);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <DashHead />
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your attendance, fitness, and daily wellness tasks
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium">Today's Status</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">Ready to Clock In</div>
              <p className="text-xs text-muted-foreground mt-1">
                Track your attendance below
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium">Daily Steps</h3>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Connect Google Fit to track
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium">Tasks Completed</h3>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">0/0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Check tasks below
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AttendanceCard userId={currentUser?.id} />
          <FitnessCard />
        </div>

        <div className="mt-6">
          <DailyTasksCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
