'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Clock } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

interface DriverCardProps {
  driver: {
    id: string
    handle: string
    region: string
    bio?: string
    avatar?: string | null
    user: {
      name: string
    }
    products: Array<{
      id: string
      name: string
      price: number
      photo?: string
    }>
    _count: {
      orders: number
    }
  }
  className?: string
}

export default function DriverCard({ driver, className }: DriverCardProps) {
  const avgPrice = driver.products.length > 0 
    ? driver.products.reduce((sum, p) => sum + p.price, 0) / driver.products.length
    : 0

  return (
    <Link 
      href={`/deliveries/${driver.handle}`}
      className={cn(
        'block bg-white rounded-xl shadow-sm border border-brand-ink/10 hover:shadow-md transition-all duration-200 hover:border-brand-green/30',
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center overflow-hidden">
            {driver.avatar ? (
              <Image
                src={driver.avatar}
                alt={driver.user.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-brand-green">
                {driver.user.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-brand-ink truncate">
                {driver.user.name}
              </h3>
              <div className="flex items-center text-sm text-brand-ink/70">
                <Star className="w-4 h-4 text-brand-amber mr-1" />
                <span>4.8</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-brand-ink/70 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>@{driver.handle}</span>
              <span className="mx-2">•</span>
              <span>{driver.region}</span>
            </div>
            
            {driver.bio && (
              <p className="text-sm text-brand-ink/80 mb-3 line-clamp-2">
                {driver.bio}
              </p>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-brand-ink/70">
                <Clock className="w-4 h-4 mr-1" />
                <span>~30 min</span>
              </div>
              
              <div className="text-brand-green font-semibold">
                {driver.products.length > 0 && (
                  <>
                    From {formatCurrency(avgPrice)}
                    <span className="text-brand-ink/70 font-normal ml-1">
                      ({driver.products.length} items)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
