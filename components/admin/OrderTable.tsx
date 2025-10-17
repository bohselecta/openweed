'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Package, 
  Clock,
  CheckCircle,
  XCircle,
  Truck
} from 'lucide-react'
import { cn, formatCurrency, formatDate, formatOrderStatus, getStatusColor } from '@/lib/utils'

interface OrderTableProps {
  orders: Array<{
    id: string
    total: number
    status: string
    notes?: string
    deliveryAddress?: string
    createdAt: string
    buyer: {
      name: string
      email: string
    }
    driver: {
      handle: string
      region: string
      user: {
        name: string
      }
    }
    items: Array<{
      id: string
      quantity: number
      price: number
      product: {
        name: string
        photo?: string
      }
    }>
  }>
  onStatusUpdate?: (orderId: string, status: string) => void
  className?: string
}

export default function OrderTable({ 
  orders, 
  onStatusUpdate,
  className 
}: OrderTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED'>('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.driver.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4" />
      case 'ACCEPTED':
      case 'PREPARING':
        return <Package className="w-4 h-4" />
      case 'OUT_FOR_DELIVERY':
        return <Truck className="w-4 h-4" />
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4" />
      case 'CANCELLED':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'PENDING':
        return 'ACCEPTED'
      case 'ACCEPTED':
        return 'PREPARING'
      case 'PREPARING':
        return 'OUT_FOR_DELIVERY'
      case 'OUT_FOR_DELIVERY':
        return 'DELIVERED'
      default:
        return null
    }
  }

  return (
    <div className={cn('bg-white rounded-xl border border-brand-ink/10', className)}>
      {/* Header */}
      <div className="p-6 border-b border-brand-ink/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-brand-ink">Orders</h2>
          <div className="text-sm text-brand-ink/70">
            {filteredOrders.length} of {orders.length} orders
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-ink/50" />
            <input
              type="text"
              placeholder="Search orders..."
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
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="PREPARING">Preparing</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-brand-ink/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-ink/70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-ink/10">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-brand-ink/5">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-brand-ink">#{order.id.slice(-8)}</div>
                    <div className="text-sm text-brand-ink/70">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-brand-ink">{order.buyer.name}</div>
                    <div className="text-sm text-brand-ink/70">{order.buyer.email}</div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-brand-ink">{order.driver.user.name}</div>
                    <div className="text-sm text-brand-ink/70">@{order.driver.handle}</div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <span className={cn(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(order.status)
                  )}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{formatOrderStatus(order.status)}</span>
                  </span>
                </td>
                
                <td className="px-6 py-4 text-sm font-medium text-brand-ink">
                  {formatCurrency(order.total)}
                </td>
                
                <td className="px-6 py-4 text-sm text-brand-ink/70">
                  {formatDate(order.createdAt)}
                </td>
                
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {getNextStatus(order.status) && (
                      <button
                        onClick={() => onStatusUpdate?.(order.id, getNextStatus(order.status)!)}
                        className="text-brand-green hover:text-brand-green/80 transition-colors text-sm font-medium"
                      >
                        Update Status
                      </button>
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

      {filteredOrders.length === 0 && (
        <div className="p-12 text-center">
          <Package className="w-12 h-12 text-brand-ink/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-ink mb-2">No orders found</h3>
          <p className="text-brand-ink/70">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No orders have been placed yet.'
            }
          </p>
        </div>
      )}
    </div>
  )
}
