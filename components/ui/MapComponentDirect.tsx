'use client'

import { useEffect, useState, useRef } from 'react'
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
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const mapCenter: [number, number] = center || [30.2672, -97.7431] // Austin coordinates

  useEffect(() => {
    let mounted = true

    const initMap = async () => {
      if (!mounted || !mapRef.current || leafletMapRef.current) return

      try {
        // Dynamically import Leaflet only on client side
        const L = await import('leaflet')
        
        // Import default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        // Create map instance
        const map = L.map(mapRef.current!, {
          center: mapCenter,
          zoom: 12,
        })

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        // Add markers for drivers
        drivers.forEach((driver) => {
          const marker = L.marker([
            mapCenter[0] + (Math.random() - 0.5) * 0.1,
            mapCenter[1] + (Math.random() - 0.5) * 0.1,
          ]).addTo(map)

          marker.bindPopup(`
            <div style="padding: 8px;">
              <h3 style="font-weight: 600; margin: 0 0 4px 0; color: #141414;">${driver.user.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">@${driver.handle}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${driver.region}</p>
              <div style="display: flex; align-items: center; font-size: 14px; color: #39D98A;">
                <span style="margin-right: 4px;">👥</span>
                <span>${driver.products.length} products</span>
              </div>
            </div>
          `)
        })

        leafletMapRef.current = map
        setIsMounted(true)
      } catch (error) {
        console.error('Error initializing map:', error)
        setIsMounted(true) // Still show the container even if map fails
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMap, 200)
    
    return () => {
      mounted = false
      clearTimeout(timer)
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove()
        } catch (error) {
          // Ignore cleanup errors
        }
        leafletMapRef.current = null
      }
    }
  }, [drivers, mapCenter])

  return (
    <div className="h-full w-full relative">
      <div 
        ref={mapRef} 
        className="h-full w-full rounded-xl"
        style={{ minHeight: '384px' }}
      />
      
      {!isMounted && (
        <div className="absolute inset-0 bg-brand-green/10 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <p className="text-brand-ink/70">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
