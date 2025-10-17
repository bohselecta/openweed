'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export default function SearchBar({ 
  className, 
  placeholder = "Enter your ZIP code" 
}: SearchBarProps) {
  const [zipCode, setZipCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!zipCode.trim()) return
    
    setIsLoading(true)
    
    try {
      // Validate ZIP code format
      const zipRegex = /^\d{5}(-\d{4})?$/
      if (!zipRegex.test(zipCode)) {
        alert('Please enter a valid ZIP code')
        return
      }

      // Navigate to search results
      router.push(`/search?zip=${zipCode}`)
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className={cn('w-full max-w-md mx-auto', className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-brand-ink/50" />
        </div>
        
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-brand-ink/20 rounded-xl bg-white text-brand-ink placeholder-brand-ink/50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={isLoading || !zipCode.trim()}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <Search className="h-5 w-5 text-brand-green hover:text-brand-green/80 transition-colors" />
        </button>
      </div>
      
      {isLoading && (
        <div className="mt-2 text-center text-sm text-brand-ink/70">
          Searching for drivers...
        </div>
      )}
    </form>
  )
}
