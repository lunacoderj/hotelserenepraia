import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardKPIs, ChartDataPoint, RecentActivity } from '../types';
import { dashboardService } from '../services/dashboardService';

interface DashboardStore {
  kpis: DashboardKPIs | null;
  revenueData: ChartDataPoint[];
  recentActivity: RecentActivity[];
  searchConsoleData: any | null;
  isLoading: boolean;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
  kpis: null,
  revenueData: [],
  recentActivity: [],
  searchConsoleData: null,
  isLoading: false,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const [kpis, revenueData, recentActivity, searchConsoleData] = await Promise.all([
        dashboardService.getKPIs(),
        dashboardService.getRevenueData(),
        dashboardService.getRecentActivity(),
        dashboardService.getSearchConsoleData()
      ]);
      set({ kpis, revenueData, recentActivity, searchConsoleData });
    } catch (err) {
      console.error("Failed to fetch dashboard data (possibly offline)", err);
    } finally {
      set({ isLoading: false });
    }
  }
    }),
    {
      name: 'hsp-dashboard-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        kpis: state.kpis, 
        revenueData: state.revenueData, 
        recentActivity: state.recentActivity, 
        searchConsoleData: state.searchConsoleData 
      }),
    }
  )
);
