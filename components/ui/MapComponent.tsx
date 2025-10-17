'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Users } from 'lucide-react'

interface MapComponentProps {
  drivers?: Array<{
    id: string
    handle: string
    region: string
    user: { name: string }
    products: Array<{ id: string; name: string; price: number }>
  }>
  center?: [number, number]
}

export default function MapComponent({ drivers = [], center }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false)
  const mapRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mapCenter: [number, number] = center || [30.2672, -97.7431] // Austin coordinates

  const initializeMap = useCallback(() => {
    if (!containerRef.current || mapRef.current) return

    // Create a unique container ID to prevent conflicts
    const containerId = `map-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    containerRef.current.id = containerId

    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeMap, 100)
    return () => clearTimeout(timer)
  }, [initializeMap])

  useEffect(() => {
    // Cleanup function
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove()
        } catch (error) {
          // Ignore cleanup errors
        }
        mapRef.current = null
      }
    }
  }, [])

  if (!isMounted) {
    return (
      <div className="h-full bg-brand-green/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🗺️</span>
          </div>
          <p className="text-brand-ink/70">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        key={`map-${containerRef.current?.id || 'default'}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            position={[
              mapCenter[0] + (Math.random() - 0.5) * 0.1, // Simulate driver locations
              mapCenter[1] + (Math.random() - 0.5) * 0.1,
            ]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-brand-ink">{driver.user.name}</h3>
                <p className="text-sm text-brand-ink/70">@{driver.handle}</p>
                <p className="text-sm text-brand-ink/70">{driver.region}</p>
                <div className="flex items-center mt-2 text-sm text-brand-green">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{driver.products.length} products</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
