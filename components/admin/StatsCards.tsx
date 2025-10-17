import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardsProps {
  stats: {
    totalDrivers: number
    activeDrivers: number
    pendingOrders: number
    totalRevenue: number
    revenueGrowth: number
    avgDeliveryTime: number
  }
  className?: string
}

export default function StatsCards({ stats, className }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      icon: Users,
      color: 'text-brand-green',
      bgColor: 'bg-brand-green/10',
      change: `${stats.activeDrivers} active`,
      changeType: 'positive' as const,
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: ShoppingCart,
      color: 'text-brand-amber',
      bgColor: 'bg-brand-amber/10',
      change: 'Needs attention',
      changeType: 'warning' as const,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-brand-violet',
      bgColor: 'bg-brand-violet/10',
      change: `+${stats.revenueGrowth}% from last month`,
      changeType: 'positive' as const,
    },
    {
      title: 'Avg Delivery Time',
      value: `${stats.avgDeliveryTime} min`,
      icon: Clock,
      color: 'text-brand-green',
      bgColor: 'bg-brand-green/10',
      change: 'Within target',
      changeType: 'positive' as const,
    },
  ]

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-brand-ink/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', card.bgColor)}>
              <card.icon className={cn('w-6 h-6', card.color)} />
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-ink">{card.value}</p>
              <p className="text-sm text-brand-ink/70">{card.title}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={cn(
              'text-sm font-medium',
              card.changeType === 'positive' && 'text-brand-green',
              card.changeType === 'warning' && 'text-brand-amber',
              card.changeType === 'negative' && 'text-red-600'
            )}>
              {card.change}
            </span>
            
            {card.changeType === 'positive' && (
              <CheckCircle className="w-4 h-4 text-brand-green" />
            )}
            {card.changeType === 'warning' && (
              <AlertCircle className="w-4 h-4 text-brand-amber" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
