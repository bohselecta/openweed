'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import SearchBar from '@/components/ui/SearchBar'
import DriverCard from '@/components/ui/DriverCard'
import MapView from '@/components/ui/MapView'
import { MapPin, Users, Clock } from 'lucide-react'

interface Driver {
  id: string
  handle: string
  region: string
  bio?: string
  avatar?: string
  user: {
    name: string
  }
  products: Array<{
    id: string
    name: string
    price: number
  }>
  _count: {
    orders: number
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const zipCode = searchParams.get('zip')
  
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (zipCode) {
      searchDrivers(zipCode)
    }
  }, [zipCode])

  const searchDrivers = async (zip: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/geo?zipCode=${zip}`)
      if (!response.ok) {
        throw new Error('Failed to search drivers')
      }
      
      const data = await response.json()
      setDrivers(data.drivers || [])
    } catch (err) {
      setError('Failed to find drivers in your area. Please try a different ZIP code.')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-ink mb-4">
              Find Cannabis Delivery
            </h1>
            <p className="text-lg text-brand-ink/70 mb-6">
              Search for verified drivers in your area
            </p>
            <SearchBar placeholder={zipCode ? `Searching ${zipCode}...` : "Enter your ZIP code"} />
          </div>
        </div>
      </div>

      {zipCode && (
        <div className="py-8 bg-brand-ink/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-brand-ink mb-2">
                  Drivers in {zipCode}
                </h2>
                <p className="text-brand-ink/70">
                  {isLoading ? 'Searching...' : `${drivers.length} drivers found`}
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-brand-ink/70">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{drivers.length} drivers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>~30 min delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Verified drivers only</span>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-brand-ink/10 p-6 animate-pulse">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-brand-ink/10 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-brand-ink/10 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-brand-ink/5 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-brand-ink/5 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-brand-ink mb-2">No drivers found</h3>
                <p className="text-brand-ink/70 mb-6">{error}</p>
                <button
                  onClick={() => window.location.href = '/search'}
                  className="px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
                >
                  Try Different ZIP Code
                </button>
              </div>
            ) : drivers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {drivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-medium text-brand-ink mb-2">No drivers in this area yet</h3>
                <p className="text-brand-ink/70 mb-6">
                  We're always adding new drivers. Check back soon or try a nearby ZIP code.
                </p>
                <button
                  onClick={() => window.location.href = '/search'}
                  className="px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
                >
                  Search Different Area
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {zipCode && drivers.length > 0 && (
        <div className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-ink mb-6 text-center">
              Map View
            </h2>
            <MapView drivers={drivers} />
          </div>
        </div>
      )}
    </Layout>
  )
}
