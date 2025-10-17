'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AnalyticsChart from '@/components/admin/AnalyticsChart'
import { BarChart3, TrendingUp, Users, MapPin } from 'lucide-react'

// Mock data - in a real app this would come from API
const mockAnalyticsData = {
  revenue: [
    { month: 'Jan', amount: 12500 },
    { month: 'Feb', amount: 15200 },
    { month: 'Mar', amount: 18900 },
    { month: 'Apr', amount: 22100 },
  ],
  orders: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 68 },
    { month: 'Apr', count: 78 },
  ],
  drivers: [
    { region: 'Austin Central', count: 12 },
    { region: 'Austin North', count: 8 },
    { region: 'Austin South', count: 6 },
    { region: 'Austin East', count: 4 },
    { region: 'Austin West', count: 3 },
  ],
  topProducts: [
    { name: 'Blue Dream', sales: 45 },
    { name: 'OG Kush', sales: 38 },
    { name: 'Gummy Bears', sales: 32 },
    { name: 'Sour Diesel Shatter', sales: 28 },
    { name: 'CBD Balm', sales: 22 },
  ],
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(mockAnalyticsData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getSummaryStats = () => {
    const totalRevenue = analyticsData.revenue.reduce((sum, item) => sum + item.amount, 0)
    const totalOrders = analyticsData.orders.reduce((sum, item) => sum + item.count, 0)
    const totalDrivers = analyticsData.drivers.reduce((sum, item) => sum + item.count, 0)
    const avgOrderValue = totalRevenue / totalOrders

    return {
      totalRevenue,
      totalOrders,
      totalDrivers,
      avgOrderValue,
    }
  }

  const stats = getSummaryStats()

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-brand-ink/10 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-brand-ink/5 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-brand-ink/5 rounded-xl"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Total Revenue</p>
                <p className="text-2xl font-bold text-brand-green">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Total Orders</p>
                <p className="text-2xl font-bold text-brand-violet">{stats.totalOrders}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-brand-violet" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Active Drivers</p>
                <p className="text-2xl font-bold text-brand-amber">{stats.totalDrivers}</p>
              </div>
              <Users className="w-8 h-8 text-brand-amber" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Avg Order Value</p>
                <p className="text-2xl font-bold text-brand-green">${stats.avgOrderValue.toFixed(0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-brand-green" />
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <AnalyticsChart data={analyticsData} />

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Driver Distribution */}
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <h3 className="text-lg font-semibold text-brand-ink mb-4">Driver Distribution</h3>
            <div className="space-y-4">
              {analyticsData.drivers.map((driver, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <span className="text-brand-ink">{driver.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-brand-ink/10 rounded-full">
                      <div 
                        className="h-2 bg-brand-green rounded-full" 
                        style={{ width: `${(driver.count / stats.totalDrivers) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-brand-ink w-8 text-right">{driver.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <h3 className="text-lg font-semibold text-brand-ink mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-brand-green/10 rounded-lg">
                <span className="text-brand-ink">Customer Satisfaction</span>
                <span className="font-semibold text-brand-green">4.8/5</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-brand-violet/10 rounded-lg">
                <span className="text-brand-ink">Avg Delivery Time</span>
                <span className="font-semibold text-brand-violet">28 min</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-brand-amber/10 rounded-lg">
                <span className="text-brand-ink">Driver Retention</span>
                <span className="font-semibold text-brand-amber">92%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-brand-green/10 rounded-lg">
                <span className="text-brand-ink">Order Completion Rate</span>
                <span className="font-semibold text-brand-green">96%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
          <h3 className="text-lg font-semibold text-brand-ink mb-4">Export Data</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Export Revenue Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-brand-violet text-white rounded-lg hover:bg-brand-violet/90 transition-colors">
              <Users className="w-4 h-4" />
              <span>Export Driver Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-brand-amber text-white rounded-lg hover:bg-brand-amber/90 transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span>Export Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
