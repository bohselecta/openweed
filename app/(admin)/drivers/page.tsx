'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DriverTable from '@/components/admin/DriverTable'
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react'

// Mock data - in a real app this would come from API
const mockDrivers = [
  {
    id: '1',
    handle: 'atxweedog',
    region: 'Austin Central',
    bio: 'Your friendly neighborhood cannabis delivery specialist! Serving Austin with premium products and excellent service. 🐕🌿',
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
    bio: 'Premium cannabis delivery with a personal touch. Quality products, fast service, and always discreet.',
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
  {
    id: '3',
    handle: 'texasgreen',
    region: 'Austin North',
    bio: 'Experienced driver with 5+ years in cannabis delivery. Focus on customer satisfaction and safety.',
    avatar: null,
    isActive: false,
    isVerified: false,
    createdAt: '2024-01-22T09:45:00Z',
    user: {
      name: 'Texas Green',
      email: 'texasgreen@example.com',
    },
    _count: {
      orders: 0,
      products: 0,
    },
  },
]

export default function DriversPage() {
  const [drivers, setDrivers] = useState(mockDrivers)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDriverApprove = async (driverId: string) => {
    try {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setDrivers(prev => prev.map(driver => 
        driver.id === driverId 
          ? { ...driver, isVerified: true, isActive: true }
          : driver
      ))
      
      console.log('Driver approved:', driverId)
    } catch (error) {
      console.error('Error approving driver:', error)
    }
  }

  const handleDriverReject = async (driverId: string) => {
    try {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setDrivers(prev => prev.filter(driver => driver.id !== driverId))
      
      console.log('Driver rejected:', driverId)
    } catch (error) {
      console.error('Error rejecting driver:', error)
    }
  }

  const getDriverStats = () => {
    const total = drivers.length
    const verified = drivers.filter(d => d.isVerified).length
    const active = drivers.filter(d => d.isActive).length
    const pending = drivers.filter(d => !d.isVerified).length

    return { total, verified, active, pending }
  }

  const stats = getDriverStats()

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
                <p className="text-sm text-brand-ink/70">Total Drivers</p>
                <p className="text-2xl font-bold text-brand-ink">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Verified</p>
                <p className="text-2xl font-bold text-brand-green">{stats.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Active</p>
                <p className="text-2xl font-bold text-brand-violet">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-brand-violet" />
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
        </div>

        {/* Driver Table */}
        <DriverTable 
          drivers={drivers}
          onApprove={handleDriverApprove}
          onReject={handleDriverReject}
        />

        {/* Bulk Actions */}
        <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
          <h3 className="text-lg font-semibold text-brand-ink mb-4">Bulk Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors">
              <CheckCircle className="w-4 h-4" />
              <span>Approve Selected</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <XCircle className="w-4 h-4" />
              <span>Reject Selected</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-brand-ink/20 text-brand-ink rounded-lg hover:bg-brand-ink/5 transition-colors">
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
