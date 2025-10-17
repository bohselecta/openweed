'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import StatsCards from '@/components/admin/StatsCards'
import DriverTable from '@/components/admin/DriverTable'
import OrderTable from '@/components/admin/OrderTable'
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'

// Mock data - in a real app this would come from API
const mockStats = {
  totalDrivers: 24,
  activeDrivers: 18,
  pendingOrders: 7,
  totalRevenue: 2430,
  revenueGrowth: 12.5,
  avgDeliveryTime: 28,
}

const mockDrivers = [
  {
    id: '1',
    handle: 'atxweedog',
    region: 'Austin Central',
    bio: 'Your friendly neighborhood cannabis delivery specialist!',
    avatar: null,
    isActive: true,
    isVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
    user: {
      name: 'Austin Weed Dog',
      email: 'atxweedog@example.com',
    },
    _count: {
      orders: 127,
      products: 5,
    },
  },
  {
    id: '2',
    handle: 'austinbuds',
    region: 'Austin Central',
    bio: 'Premium cannabis delivery with a personal touch.',
    avatar: null,
    isActive: true,
    isVerified: false,
    createdAt: '2024-01-20T14:15:00Z',
    user: {
      name: 'Austin Buds',
      email: 'austinbuds@example.com',
    },
    _count: {
      orders: 89,
      products: 3,
    },
  },
]

const mockOrders = [
  {
    id: '1',
    total: 70.00,
    status: 'PENDING',
    notes: 'Please leave at front door',
    deliveryAddress: '1234 Demo St, Austin, TX 78704',
    createdAt: '2024-01-25T16:30:00Z',
    buyer: {
      name: 'Demo Buyer',
      email: 'buyer@example.com',
    },
    driver: {
      handle: 'atxweedog',
      region: 'Austin Central',
      user: {
        name: 'Austin Weed Dog',
      },
    },
    items: [
      {
        id: '1',
        quantity: 1,
        price: 45.00,
        product: {
          name: 'Blue Dream',
          photo: null,
        },
      },
      {
        id: '2',
        quantity: 1,
        price: 25.00,
        product: {
          name: 'Gummy Bears',
          photo: null,
        },
      },
    ],
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDriverApprove = (driverId: string) => {
    console.log('Approving driver:', driverId)
    // In a real app, this would call the API
  }

  const handleDriverReject = (driverId: string) => {
    console.log('Rejecting driver:', driverId)
    // In a real app, this would call the API
  }

  const handleOrderStatusUpdate = (orderId: string, status: string) => {
    console.log('Updating order status:', orderId, status)
    // In a real app, this would call the API
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-brand-ink/10 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-brand-ink/5 rounded-xl"></div>
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
        {/* Stats Cards */}
        <StatsCards stats={mockStats} />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Drivers */}
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-brand-ink">Recent Drivers</h2>
              <div className="flex items-center space-x-2 text-sm text-brand-ink/70">
                <Users className="w-4 h-4" />
                <span>{mockDrivers.length} total</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockDrivers.slice(0, 3).map((driver) => (
                <div key={driver.id} className="flex items-center justify-between p-4 bg-brand-ink/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-green">
                        {driver.user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-ink">{driver.user.name}</p>
                      <p className="text-sm text-brand-ink/70">@{driver.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-brand-ink">{driver._count.orders} orders</p>
                    <p className="text-xs text-brand-ink/70">{driver.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-brand-ink">Recent Orders</h2>
              <div className="flex items-center space-x-2 text-sm text-brand-ink/70">
                <ShoppingCart className="w-4 h-4" />
                <span>{mockOrders.length} pending</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-brand-ink/5 rounded-lg">
                  <div>
                    <p className="font-medium text-brand-ink">Order #{order.id.slice(-8)}</p>
                    <p className="text-sm text-brand-ink/70">{order.buyer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-brand-ink">${order.total}</p>
                    <p className="text-xs text-brand-ink/70">{order.driver.handle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
          <h2 className="text-xl font-semibold text-brand-ink mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-brand-green/10 rounded-lg hover:bg-brand-green/20 transition-colors">
              <Users className="w-6 h-6 text-brand-green" />
              <div className="text-left">
                <p className="font-medium text-brand-ink">Review Drivers</p>
                <p className="text-sm text-brand-ink/70">Approve pending applications</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-brand-violet/10 rounded-lg hover:bg-brand-violet/20 transition-colors">
              <ShoppingCart className="w-6 h-6 text-brand-violet" />
              <div className="text-left">
                <p className="font-medium text-brand-ink">Manage Orders</p>
                <p className="text-sm text-brand-ink/70">Update order status</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-brand-amber/10 rounded-lg hover:bg-brand-amber/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-brand-amber" />
              <div className="text-left">
                <p className="font-medium text-brand-ink">View Analytics</p>
                <p className="text-sm text-brand-ink/70">Check performance metrics</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
