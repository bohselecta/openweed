'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import OrderTable from '@/components/admin/OrderTable'
import { ShoppingCart, Clock, CheckCircle, DollarSign } from 'lucide-react'

// Mock data - in a real app this would come from API
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
  {
    id: '2',
    total: 50.00,
    status: 'ACCEPTED',
    notes: 'Call when you arrive',
    deliveryAddress: '5678 Main St, Austin, TX 78701',
    createdAt: '2024-01-25T14:15:00Z',
    buyer: {
      name: 'John Smith',
      email: 'john@example.com',
    },
    driver: {
      handle: 'austinbuds',
      region: 'Austin Central',
      user: {
        name: 'Austin Buds',
      },
    },
    items: [
      {
        id: '3',
        quantity: 1,
        price: 50.00,
        product: {
          name: 'OG Kush',
          photo: null,
        },
      },
    ],
  },
  {
    id: '3',
    total: 90.00,
    status: 'DELIVERED',
    notes: 'Delivered successfully',
    deliveryAddress: '9012 Oak St, Austin, TX 78702',
    createdAt: '2024-01-24T10:20:00Z',
    buyer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
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
        id: '4',
        quantity: 1,
        price: 65.00,
        product: {
          name: 'Sour Diesel Shatter',
          photo: null,
        },
      },
      {
        id: '5',
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

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status }
          : order
      ))
      
      console.log('Order status updated:', orderId, status)
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getOrderStats = () => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'PENDING').length
    const delivered = orders.filter(o => o.status === 'DELIVERED').length
    const totalRevenue = orders
      .filter(o => o.status === 'DELIVERED')
      .reduce((sum, o) => sum + o.total, 0)

    return { total, pending, delivered, totalRevenue }
  }

  const stats = getOrderStats()

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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Total Orders</p>
                <p className="text-2xl font-bold text-brand-ink">{stats.total}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Pending</p>
                <p className="text-2xl font-bold text-brand-amber">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-brand-amber" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Delivered</p>
                <p className="text-2xl font-bold text-brand-green">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Revenue</p>
                <p className="text-2xl font-bold text-brand-violet">${stats.totalRevenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-brand-violet" />
            </div>
          </div>
        </div>

        {/* Order Table */}
        <OrderTable 
          orders={orders}
          onStatusUpdate={handleOrderStatusUpdate}
        />

        {/* Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <h3 className="text-lg font-semibold text-brand-ink mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-brand-ink/5 rounded-lg">
                  <div>
                    <p className="font-medium text-brand-ink">#{order.id.slice(-8)}</p>
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

          {/* Order Status Distribution */}
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <h3 className="text-lg font-semibold text-brand-ink mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-brand-ink/70">Pending</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-brand-ink/10 rounded-full">
                    <div 
                      className="h-2 bg-brand-amber rounded-full" 
                      style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-ink">{stats.pending}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-brand-ink/70">Delivered</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-brand-ink/10 rounded-full">
                    <div 
                      className="h-2 bg-brand-green rounded-full" 
                      style={{ width: `${(stats.delivered / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-ink">{stats.delivered}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
