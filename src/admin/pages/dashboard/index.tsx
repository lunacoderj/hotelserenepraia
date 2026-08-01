import React, { useEffect } from 'react';
import { useDashboardStore } from '../../stores/useDashboardStore';
import { StatCard } from '../../components/cards/StatCard';
import { ActivityFeed } from '../../components/cards/ActivityFeed';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { TopSearchQueries } from '../../components/charts/TopSearchQueries';
import { Users, Home, CalendarCheck, IndianRupee, BedDouble, CalendarX } from 'lucide-react';
import { User } from 'lucide-react';

export const Dashboard = () => {
  const { kpis, searchConsoleData, recentActivity, fetchDashboardData, isLoading } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading || !kpis) {
    return <div className="animate-pulse space-y-8">
      <div className="h-32 bg-slate-200 rounded-xl w-full"></div>
      <div className="h-64 bg-slate-200 rounded-xl w-full"></div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-heading-md text-navy">Dashboard Overview</h1>
        <div className="text-body-sm text-navy-500/70">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Today's Occupancy" value={`${kpis.occupancyRate}%`} icon={Home} trend="+5%" />
        <StatCard title="Available Rooms" value={kpis.availableRooms.toString()} icon={BedDouble} />
        <StatCard title="Available Banquets" value={kpis.availableBanquets.toString()} icon={Users} />
        <StatCard title="Today's Check-ins" value={kpis.checkInsToday.toString()} icon={CalendarCheck} />
        <StatCard title="Pending Bookings" value={kpis.pendingBookings.toString()} icon={CalendarX} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-navy/5 shadow-sm h-full relative overflow-hidden mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-display text-heading-sm text-navy">Search Console Analytics</h2>
                <p className="text-sm text-navy-500/70">Google Search performance (Last 30 Days)</p>
              </div>
            </div>
            
            <AnalyticsChart data={searchConsoleData} />
            
          </div>

          <TopSearchQueries data={searchConsoleData?.queryData} />
        </div>
        
        <div className="lg:col-span-1">
          <ActivityFeed activities={recentActivity} />
        </div>
      </div>
    </div>
  );
};
