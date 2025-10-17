'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Palette, MapPin, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MiniSitePreviewProps {
  driverData: {
    handle: string
    region: string
    bio: string
    avatar?: string
    user: {
      name: string
    }
  }
  className?: string
}

const THEME_COLORS = [
  { name: 'Green', value: '#39D98A', class: 'bg-brand-green' },
  { name: 'Violet', value: '#B874F4', class: 'bg-brand-violet' },
  { name: 'Amber', value: '#FBBF24', class: 'bg-brand-amber' },
]

export default function MiniSitePreview({ 
  driverData, 
  className 
}: MiniSitePreviewProps) {
  const [selectedTheme, setSelectedTheme] = useState(THEME_COLORS[0])
  const [isPreviewMode, setIsPreviewMode] = useState(true)

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h3 className="text-lg font-semibold text-brand-ink mb-2">
          Your Mini-Site Preview
        </h3>
        <p className="text-sm text-brand-ink/70 mb-4">
          This is how your delivery site will look to customers. 
          You can customize the theme and add products after approval.
        </p>
      </div>

      {/* Theme selector */}
      <div>
        <label className="block text-sm font-medium text-brand-ink mb-3">
          <Palette className="w-4 h-4 inline mr-1" />
          Choose Theme Color
        </label>
        <div className="flex space-x-3">
          {THEME_COLORS.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme)}
              className={cn(
                'w-12 h-12 rounded-lg border-2 transition-all duration-200',
                selectedTheme.value === theme.value
                  ? 'border-brand-ink scale-110'
                  : 'border-brand-ink/20 hover:border-brand-ink/50'
              )}
              style={{ backgroundColor: theme.value }}
            >
              <span className="sr-only">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsPreviewMode(true)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            isPreviewMode
              ? 'bg-brand-green text-white'
              : 'bg-brand-ink/10 text-brand-ink'
          )}
        >
          Desktop
        </button>
        <button
          onClick={() => setIsPreviewMode(false)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            !isPreviewMode
              ? 'bg-brand-green text-white'
              : 'bg-brand-ink/10 text-brand-ink'
          )}
        >
          Mobile
        </button>
      </div>

      {/* Mini-site preview */}
      <div className={cn(
        'bg-white rounded-xl border border-brand-ink/10 overflow-hidden',
        isPreviewMode ? 'max-w-4xl mx-auto' : 'max-w-sm mx-auto'
      )}>
        {/* Header */}
        <div 
          className="p-6 text-white"
          style={{ backgroundColor: selectedTheme.value }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              {driverData.avatar ? (
                <Image
                  src={driverData.avatar}
                  alt={driverData.user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">
                  {driverData.user.name.charAt(0)}
                </span>
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{driverData.user.name}</h1>
              <p className="text-white/80">@{driverData.handle}</p>
              <div className="flex items-center mt-1 text-sm text-white/70">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{driverData.region}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-brand-ink mb-2">About</h2>
            <p className="text-brand-ink/80">{driverData.bio}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-brand-ink mb-4">Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-brand-ink/5 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🌿</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-brand-ink">Sample Product {i}</h3>
                      <p className="text-sm text-brand-ink/70">$25.00</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-ink/5 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-brand-ink mb-2">Live Chat</h3>
            <p className="text-sm text-brand-ink/70 mb-3">
              Chat with {driverData.user.name} directly for questions or custom orders.
            </p>
            <div className="bg-white rounded-lg p-3 border border-brand-ink/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                <span className="text-sm text-brand-green font-medium">Online now</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button 
              className="flex-1 bg-brand-green text-white py-3 px-4 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
              style={{ backgroundColor: selectedTheme.value }}
            >
              Place Order
            </button>
            <button className="px-4 py-3 border border-brand-ink/20 rounded-lg hover:bg-brand-ink/5 transition-colors">
              💬 Chat
            </button>
          </div>
        </div>
      </div>

      {/* Live link */}
      <div className="text-center">
        <Link
          href={`/deliveries/${driverData.handle}`}
          className="inline-flex items-center space-x-2 text-brand-green hover:text-brand-green/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View live site: openweed.co/deliveries/{driverData.handle}</span>
        </Link>
      </div>

      <div className="bg-brand-green/10 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-brand-green mt-0.5" />
          <div>
            <h4 className="font-semibold text-brand-ink mb-1">
              Next Steps
            </h4>
            <ul className="text-sm text-brand-ink/70 space-y-1">
              <li>• Complete your profile setup</li>
              <li>• Wait for admin approval (24-48 hours)</li>
              <li>• Add your product catalog</li>
              <li>• Start accepting orders!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
