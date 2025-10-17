import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn('min-h-screen bg-brand-paper', className)}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="bg-brand-ink text-brand-paper">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/graphic-logo.png"
                alt="OpenWeed Logo"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">OpenWeed</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="hover:text-brand-green transition-colors">
              Find Delivery
            </Link>
            <Link href="/lounge/austin-central" className="hover:text-brand-green transition-colors">
              Smokers Lounge
            </Link>
            <Link href="/onboard/driver" className="hover:text-brand-green transition-colors">
              Start Driving
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/onboard/register"
              className="px-4 py-2 bg-brand-green text-brand-ink rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-paper py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 relative">
                <Image
                  src="/graphic-logo.png"
                  alt="OpenWeed Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold">OpenWeed</span>
            </div>
            <p className="text-sm text-brand-paper/70">
              Your local weed network — delivered by people you know.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-brand-green transition-colors">Find Delivery</Link></li>
              <li><Link href="/lounge/austin-central" className="hover:text-brand-green transition-colors">Smokers Lounge</Link></li>
              <li><Link href="/how-it-works" className="hover:text-brand-green transition-colors">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Drivers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/onboard/driver" className="hover:text-brand-green transition-colors">Start Driving</Link></li>
              <li><Link href="/driver-resources" className="hover:text-brand-green transition-colors">Resources</Link></li>
              <li><Link href="/driver-support" className="hover:text-brand-green transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-brand-green transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-brand-green transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-green transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-paper/20 mt-8 pt-8 text-center text-sm text-brand-paper/70">
          <p>&copy; 2024 OpenWeed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
