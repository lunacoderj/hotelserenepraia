import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface AnalyticsChartProps {
  data: any;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  // Parse Search Console API response
  // format: data.rows = [{ keys: ["2023-10-01"], clicks: 10, impressions: 100, ctr: 0.1, position: 5 }]
  const formattedData = React.useMemo(() => {
    if (!data || !data.chartData || !data.chartData.rows) return [];
    
    return data.chartData.rows.map((row: any) => {
      const dateStr = row.keys[0]; // e.g., "2023-10-01"
      const date = new Date(dateStr);
      return {
        name: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        Clicks: row.clicks,
        Impressions: row.impressions,
      };
    });
  }, [data]);

  if (!formattedData.length) {
    return (
      <div className="h-64 flex items-center justify-center text-navy-500/50">
        No search data available. Waiting for integration...
      </div>
    );
  }

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            yAxisId="left"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1E293B', fontWeight: 500 }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="Impressions" 
            stroke="#94A3B8" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="Clicks" 
            stroke="#D4AF37" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#1E293B' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
