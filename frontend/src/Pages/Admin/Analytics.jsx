// src/Pages/Admin/Analytics.jsx
import React, { useMemo, useState } from "react";
import { useGetDashboardData, useGetDailySales } from "@/hooks/Admin/admin.hook";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  // Summary data
  const { data: dashboardData, isLoading: summaryLoading } = useGetDashboardData();

  
  // Simple date range – abhi hardcoded, baad mein date picker se le sakte ho
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6); // last 7 days
    end.setDate(end.getDate()+2)

    const toStr = (d) => d.toISOString().split("T")[0];

    return {
      startDate: toStr(start),
      endDate: toStr(end),
    };
  }, []);

  // Daily sales (enrollments) data
  const { data: dailySalesData, isLoading: dailyLoading } = useGetDailySales(
    startDate,
    endDate
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Analytics Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Users"
          value={summaryLoading ? "..." : dashboardData?.users ?? 0}
        />
        <SummaryCard
          title="Total Courses"
          value={summaryLoading ? "..." : dashboardData?.courses ?? 0}
        />
        <SummaryCard
          title="Total Enrollments"
          value={summaryLoading ? "..." : dashboardData?.totalEnrollments ?? 0}
        />
        <SummaryCard
          title="Total Revenue"
          value={
            summaryLoading
              ? "..."
              : `₹${(dashboardData?.totalRevenue ?? 0).toLocaleString()}`
          }
        />
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 h-[320px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Revenue (Daily)
          </h2>
          <p className="text-xs text-gray-500">
            {startDate} → {endDate}
          </p>
        </div>

        {dailyLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">Loading chart...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData || []}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") return [`₹${value}`, "Revenue"];
                  if (name === "enrollments" || name === "sales")
                    return [value, "Enrollments"];
                  return [value, name];
                }}
              />
              {/* Agar controller `sales` return kar raha hai toh dataKey="sales" rakho;
                  agar `enrollments` hai toh uska naam use karo */}
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
      {title}
    </p>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
  </div>
);

export default Analytics;
