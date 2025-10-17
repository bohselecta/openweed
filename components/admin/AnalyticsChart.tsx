'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, MapPin, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyticsChartProps {
  data: {
    revenue: Array<{ month: string; amount: number }>
    orders: Array<{ month: string; count: number }>
    drivers: Array<{ region: string; count: number }>
    topProducts: Array<{ name: string; sales: number }>
  }
  className?: string
}

export default function AnalyticsChart({ data, className }: AnalyticsChartProps) {
  const [activeTab, setActiveTab] = useState<'revenue' | 'orders' | 'drivers' | 'products'>('revenue')

  const tabs = [
    { id: 'revenue', label: 'Revenue', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: BarChart3 },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'products', label: 'Top Products', icon: BarChart3 },
  ]

  const renderChart = () => {
    switch (activeTab) {
      case 'revenue':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.revenue.map((item, index) => (
                <div key={index} className="bg-brand-green/10 rounded-lg p-4">
                  <div className="text-sm text-brand-ink/70">{item.month}</div>
                  <div className="text-xl font-bold text-brand-green">
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-brand-ink/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-brand-ink/30 mx-auto mb-2" />
                <p className="text-brand-ink/70">Revenue chart would go here</p>
              </div>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.orders.map((item, index) => (
                <div key={index} className="bg-brand-violet/10 rounded-lg p-4">
                  <div className="text-sm text-brand-ink/70">{item.month}</div>
                  <div className="text-xl font-bold text-brand-violet">
                    {item.count} orders
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-brand-ink/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-brand-ink/30 mx-auto mb-2" />
                <p className="text-brand-ink/70">Orders chart would go here</p>
              </div>
            </div>
          </div>
        )

      case 'drivers':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.drivers.map((item, index) => (
                <div key={index} className="bg-brand-amber/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-amber" />
                    <span className="text-sm text-brand-ink/70">{item.region}</span>
                  </div>
                  <div className="text-xl font-bold text-brand-amber mt-1">
                    {item.count} drivers
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-brand-ink/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="w-12 h-12 text-brand-ink/30 mx-auto mb-2" />
                <p className="text-brand-ink/70">Driver distribution chart would go here</p>
              </div>
            </div>
          </div>
        )

      case 'products':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {data.topProducts.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-brand-green/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-brand-ink">{item.name}</span>
                  </div>
                  <div className="text-brand-green font-semibold">
                    {item.sales} sales
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-brand-ink/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-brand-ink/30 mx-auto mb-2" />
                <p className="text-brand-ink/70">Product sales chart would go here</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('bg-white rounded-xl border border-brand-ink/10', className)}>
      {/* Header */}
      <div className="p-6 border-b border-brand-ink/10">
        <h2 className="text-xl font-semibold text-brand-ink mb-4">Analytics Dashboard</h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-brand-ink/5 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-white text-brand-ink shadow-sm'
                  : 'text-brand-ink/70 hover:text-brand-ink'
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        {renderChart()}
      </div>
    </div>
  )
}
