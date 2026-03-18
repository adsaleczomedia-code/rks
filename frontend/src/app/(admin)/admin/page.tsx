"use client";

import { LayoutDashboard, Tags, Layers, Package, Users, TrendingUp } from "lucide-react";

const stats = [
  { name: "Total Categories", value: "12", icon: Tags, color: "text-blue-600", bg: "bg-blue-100" },
  { name: "Total Subcategories", value: "48", icon: Layers, color: "text-purple-600", bg: "bg-purple-100" },
  { name: "Total Products", value: "156", icon: Package, color: "text-emerald-600", bg: "bg-emerald-100" },
  { name: "Active Users", value: "2.4k", icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-bold">
              <TrendingUp size={14} className="mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for recent activity */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center pb-6 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mr-4">
                <Users size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">New Category Added</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <span className="text-xs font-bold text-[#5b52e3] bg-[#5b52e3]/10 px-3 py-1 rounded-full">Automated</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
