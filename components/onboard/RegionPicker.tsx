'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dynamically import map components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
)

interface RegionPickerProps {
  onRegionSelect: (region: string, coordinates: { lat: number; lng: number }) => void
  initialRegion?: string
  className?: string
}

const REGIONS = [
  {
    id: 'Austin Central',
    center: [30.2672, -97.7431] as [number, number],
    radius: 10000, // 10km radius
    color: '#39D98A',
  },
  {
    id: 'Austin North',
    center: [30.35, -97.75] as [number, number],
    radius: 8000,
    color: '#B874F4',
  },
  {
    id: 'Austin South',
    center: [30.2, -97.75] as [number, number],
    radius: 8000,
    color: '#FBBF24',
  },
  {
    id: 'Austin East',
    center: [30.27, -97.7] as [number, number],
    radius: 8000,
    color: '#39D98A',
  },
  {
    id: 'Austin West',
    center: [30.27, -97.8] as [number, number],
    radius: 8000,
    color: '#B874F4',
  },
]

export default function RegionPicker({ 
  onRegionSelect, 
  initialRegion = 'Austin Central',
  className 
}: RegionPickerProps) {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRegionClick = (region: typeof REGIONS[0]) => {
    setSelectedRegion(region.id)
    onRegionSelect(region.id, {
      lat: region.center[0],
      lng: region.center[1],
    })
  }

  if (!isClient) {
    return (
      <div className={cn('h-96 bg-brand-green/10 rounded-xl flex items-center justify-center', className)}>
        <div className="text-center">
          <MapPin className="w-12 h-12 text-brand-green mx-auto mb-4" />
          <p className="text-brand-ink/70">Loading map...</p>
        </div>
      </div>
    )
  }

  const selectedRegionData = REGIONS.find(r => r.id === selectedRegion) || REGIONS[0]

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h3 className="text-lg font-semibold text-brand-ink mb-2">
          Select Your Service Area
        </h3>
        <p className="text-sm text-brand-ink/70 mb-4">
          Choose the region where you'll be providing delivery services. 
          You can update this later in your driver settings.
        </p>
      </div>

      {/* Region buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            onClick={() => handleRegionClick(region)}
            className={cn(
              'p-3 rounded-lg border text-left transition-all duration-200',
              selectedRegion === region.id
                ? 'border-brand-green bg-brand-green/10 text-brand-green'
                : 'border-brand-ink/20 hover:border-brand-green/50'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{region.id}</span>
              {selectedRegion === region.id && (
                <CheckCircle className="w-4 h-4" />
              )}
            </div>
            <div 
              className="w-3 h-3 rounded-full mt-1"
              style={{ backgroundColor: region.color }}
            />
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="h-96 rounded-xl overflow-hidden border border-brand-ink/10">
        <MapContainer
          center={selectedRegionData.center}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {REGIONS.map((region) => (
            <Circle
              key={region.id}
              center={region.center}
              radius={region.radius}
              pathOptions={{
                color: region.color,
                fillColor: region.color,
                fillOpacity: selectedRegion === region.id ? 0.2 : 0.1,
                weight: selectedRegion === region.id ? 3 : 1,
              }}
            />
          ))}
          
          <Marker position={selectedRegionData.center}>
            <div className="p-2">
              <h4 className="font-semibold text-brand-ink">{selectedRegionData.id}</h4>
              <p className="text-sm text-brand-ink/70">Service Area</p>
            </div>
          </Marker>
        </MapContainer>
      </div>

      <div className="bg-brand-green/10 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-brand-green mt-0.5" />
          <div>
            <h4 className="font-semibold text-brand-ink mb-1">
              Selected: {selectedRegion}
            </h4>
            <p className="text-sm text-brand-ink/70">
              This area covers approximately {Math.round(selectedRegionData.radius / 1000)}km radius. 
              You can adjust your specific service boundaries after approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
