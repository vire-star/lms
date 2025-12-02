import { dailySalesApi, DashboardApi } from '@/Api/Admin/admin.api';
import { useQuery } from '@tanstack/react-query'

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: DashboardApi,
  });
};


export const useGetDailySales = (startDate, endDate) => {
  return useQuery({
    queryKey: ["daily-sales", startDate, endDate],
    queryFn: () => dailySalesApi(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};
