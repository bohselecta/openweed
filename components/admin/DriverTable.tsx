'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  User
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

interface DriverTableProps {
  drivers: Array<{
    id: string
    handle: string
    region: string
    bio?: string
    avatar?: string
    isActive: boolean
    isVerified: boolean
    createdAt: string
    user: {
      name: string
      email: string
    }
    _count: {
      orders: number
      products: number
    }
  }>
  onApprove?: (driverId: string) => void
  onReject?: (driverId: string) => void
  className?: string
}

export default function DriverTable({ 
  drivers, 
  onApprove, 
  onReject,
  className 
}: DriverTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'verified'>('all')

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'pending' && !driver.isVerified) ||
      (statusFilter === 'active' && driver.isActive) ||
      (statusFilter === 'verified' && driver.isVerified)

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (driver: typeof drivers[0]) => {
    if (!driver.isVerified) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-amber/20 text-brand-amber">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      )
    }
    
    if (driver.isActive) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-green/20 text-brand-green">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      )
    }
    
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </span>
    )
  }

  return (
    <div className={cn('bg-white rounded-xl border border-brand-ink/10', className)}>
      {/* Header */}
      <div className="p-6 border-b border-brand-ink/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-brand-ink">Drivers</h2>
          <div className="text-sm text-brand-ink/70">
            {filteredDrivers.length} of {drivers.length} drivers
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-ink/50" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-brand-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-brand-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="verified">Verified</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-brand-ink/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-ink/10">
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-brand-ink/5">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center overflow-hidden">
                      {driver.avatar ? (
                        <Image
                          src={driver.avatar}
                          alt={driver.user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-brand-green" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-brand-ink">{driver.user.name}</div>
                      <div className="text-sm text-brand-ink/70">@{driver.handle}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-brand-ink/70">
                    <MapPin className="w-4 h-4 mr-1" />
                    {driver.region}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  {getStatusBadge(driver)}
                </td>
                
                <td className="px-6 py-4 text-sm text-brand-ink">
                  {driver._count.orders}
                </td>
                
                <td className="px-6 py-4 text-sm text-brand-ink">
                  {driver._count.products}
                </td>
                
                <td className="px-6 py-4 text-sm text-brand-ink/70">
                  {formatDate(driver.createdAt)}
                </td>
                
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {!driver.isVerified && (
                      <>
                        <button
                          onClick={() => onApprove?.(driver.id)}
                          className="text-brand-green hover:text-brand-green/80 transition-colors"
                          title="Approve driver"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onReject?.(driver.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Reject driver"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    <button className="text-brand-ink/50 hover:text-brand-ink transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredDrivers.length === 0 && (
        <div className="p-12 text-center">
          <User className="w-12 h-12 text-brand-ink/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-ink mb-2">No drivers found</h3>
          <p className="text-brand-ink/70">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No drivers have registered yet.'
            }
          </p>
        </div>
      )}
    </div>
  )
}
