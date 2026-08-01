import React from 'react';
import { RecentActivity } from '../../types';
import { CheckCircle2, XCircle, LogIn, LogOut, Sparkles, Wrench } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  activities: RecentActivity[];
}

const getActivityIcon = (type: RecentActivity['type']) => {
  switch (type) {
    case 'booking_created': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'booking_cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
    case 'check_in': return <LogIn className="w-4 h-4 text-blue-500" />;
    case 'check_out': return <LogOut className="w-4 h-4 text-orange-500" />;
    case 'cleaning': return <Sparkles className="w-4 h-4 text-amber-500" />;
    case 'maintenance': return <Wrench className="w-4 h-4 text-slate-500" />;
  }
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-navy/5 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-heading-sm text-navy">Recent Activity</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={activity.id} className="relative flex gap-4">
              {i !== activities.length - 1 && (
                <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-slate-200" />
              )}
              <div className="relative z-10 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-white shadow-sm">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 pt-1.5">
                <p className="text-sm text-navy font-medium leading-none mb-1">{activity.message}</p>
                <p className="text-xs text-navy-500/60">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
