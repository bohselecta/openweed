'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dynamically import the direct map component to avoid SSR issues
const DynamicMap = dynamic(() => import('./MapComponentDirect'), { 
  ssr: false,
  loading: () => (
    <div className="h-96 bg-brand-green/10 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-brand-green mx-auto mb-4" />
        <p className="text-brand-ink/70">Loading map...</p>
      </div>
    </div>
  )
})

interface MapViewProps {
  drivers?: Array<{
    id: string
    handle: string
    region: string
    user: { name: string }
    products: Array<{ id: string; name: string; price: number }>
  }>
  center?: [number, number]
  className?: string
}

export default function MapView({ drivers = [], center, className }: MapViewProps) {
  return (
    <div className={cn('h-96 rounded-xl overflow-hidden border border-brand-ink/10', className)}>
      <DynamicMap drivers={drivers} center={center} />
    </div>
  )
}
