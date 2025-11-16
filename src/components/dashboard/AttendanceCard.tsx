import { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceCardProps {
  userId: number | undefined;
}

export interface Attendance {
  userId: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  clock_in?: string;
  clock_out?: string;
  location_address?: string;
}

interface AttendanceResponse {
  success: boolean;
  data: Attendance[];
  error?: string;
}

const AttendanceCard = ({ userId }: AttendanceCardProps) => {
  const [loading, setLoading] = useState(false);
  const [activeAttendance, setActiveAttendance] = useState<Attendance | null>(
    null
  );
  const [todayAttendance, setTodayAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    if (userId) fetchTodayAttendance();
  }, [userId]);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTodayAttendance = async () => {
    const res = await fetch(`${API_URL}/attendance/today/${userId}`);
    const json: AttendanceResponse = await res.json();

    if (json.success) {
      setTodayAttendance(json.data);

      const active = json.data.find((att) => !att.clock_out) ?? null;
      setActiveAttendance(active);
    }
  };

  const getLocation = (): Promise<{
    lat: number;
    lng: number;
    address: string;
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );

            const data = await response.json();
            const address = data.display_name || `${lat}, ${lng}`;
            resolve({ lat, lng, address });
          } catch {
            resolve({ lat, lng, address: `${lat}, ${lng}` });
          }
        },
        (error) => reject(error)
      );
    });
  };

  const handleClockIn = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const location = await getLocation();

      const res = await fetch(`${API_URL}/attendance/clock-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          location_lat: location.lat,
          location_lng: location.lng,
          location_address: location.address,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      toast.success('Clocked in successfully!');
      fetchTodayAttendance();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to clock in');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    if (!activeAttendance) return;

    console.log('todayAttendance', todayAttendance);

    return false;

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/attendance/clock-out/${activeAttendance?.userId}`,
        { method: 'PUT' }
      );

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      toast.success('Clocked out successfully!');
      fetchTodayAttendance();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to clock out');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" /> Attendance Tracking
        </h3>
        <p className="text-sm text-muted-foreground">
          Clock in and out with GPS location
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-4">
          {activeAttendance ? (
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-semibold text-success">
                  Currently Clocked In
                </span>
              </div>

              <p className="text-sm">
                In:{' '}
                {activeAttendance.clock_in
                  ? new Date(activeAttendance.clock_in).toLocaleTimeString()
                  : '--'}
              </p>

              {activeAttendance.location_address && (
                <div className="flex items-start gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  {activeAttendance.location_address}
                </div>
              )}

              <button
                onClick={handleClockOut}
                disabled={loading}
                className="w-full mt-4 bg-destructive text-white rounded-md h-10"
              >
                {loading ? 'Processing...' : 'Clock Out'}
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Click below to clock in with GPS
              </p>
              <button
                onClick={handleClockIn}
                disabled={loading}
                className="w-full bg-primary text-white rounded-md h-10"
              >
                {loading ? 'Getting location…' : 'Clock In'}
              </button>
            </>
          )}

          {todayAttendance.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-sm mb-2">Today's History</h4>
              {todayAttendance.map((att) => (
                <div
                  key={att.userId}
                  className="text-xs p-2 bg-muted/50 rounded"
                >
                  <div className="flex justify-between">
                    <span>
                      In:{' '}
                      {att.clock_in
                        ? new Date(att.clock_in).toLocaleTimeString()
                        : '--'}
                    </span>

                    {att.clock_out && (
                      <span>
                        Out: {new Date(att.clock_out).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
