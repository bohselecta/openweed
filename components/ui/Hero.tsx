import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
}

export default function Hero({ className }: HeroProps) {
  return (
    <section className={cn('py-24 text-center', className)}>
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-extrabold text-brand-ink mb-6">
          OpenWeed
        </h1>
        <p className="text-xl text-brand-ink/80 max-w-2xl mx-auto mb-8">
          Your local weed network — delivered by people you know. 
          Connect with verified drivers in your area for safe, reliable cannabis delivery.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link 
            href="/search" 
            className="px-8 py-4 bg-brand-green text-white rounded-xl font-semibold text-lg hover:bg-brand-green/90 transition-colors"
          >
            Find Delivery
          </Link>
          <Link 
            href="/onboard/driver" 
            className="px-8 py-4 border-2 border-brand-green text-brand-green rounded-xl font-semibold text-lg hover:bg-brand-green hover:text-white transition-colors"
          >
            Start My Own
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="font-semibold text-brand-ink mb-2">Verified Drivers</h3>
            <p className="text-sm text-brand-ink/70">
              All drivers are background checked and licensed
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="font-semibold text-brand-ink mb-2">Fast Delivery</h3>
            <p className="text-sm text-brand-ink/70">
              Get your order delivered in under an hour
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-semibold text-brand-ink mb-2">Community</h3>
            <p className="text-sm text-brand-ink/70">
              Join the Smokers Lounge for local chat
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
