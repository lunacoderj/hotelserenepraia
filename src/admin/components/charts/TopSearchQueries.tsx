import React from 'react';
import { Search } from 'lucide-react';

interface TopSearchQueriesProps {
  data: any;
}

export const TopSearchQueries: React.FC<TopSearchQueriesProps> = ({ data }) => {
  const queries = React.useMemo(() => {
    if (!data || !data.rows) return [];
    
    return data.rows.map((row: any) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: (row.ctr * 100).toFixed(2) + '%',
      position: row.position.toFixed(1)
    }));
  }, [data]);

  if (!queries.length) {
    return (
      <div className="h-64 flex items-center justify-center text-navy-500/50 bg-white rounded-xl border border-navy/5 shadow-sm p-6">
        No search queries available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-navy/5 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display text-heading-sm text-navy">Top Search Terms</h2>
          <p className="text-sm text-navy-500/70">What people type into Google to find you</p>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Search Query</th>
              <th className="px-6 py-4 font-medium text-right">Clicks</th>
              <th className="px-6 py-4 font-medium text-right">Impressions</th>
              <th className="px-6 py-4 font-medium text-right">Position</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {queries.map((q: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-navy">{q.query}</td>
                <td className="px-6 py-4 text-sm text-right text-navy-600 font-semibold">{q.clicks}</td>
                <td className="px-6 py-4 text-sm text-right text-slate-500">{q.impressions}</td>
                <td className="px-6 py-4 text-sm text-right text-slate-500">#{q.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
