'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Drivers', href: '/admin/drivers', icon: Users },
  { name: 'Inventory', href: '/admin/inventory', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className={cn('min-h-screen bg-brand-paper', className)}>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-brand-ink text-brand-paper">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-brand-paper/10">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/graphic-logo.png"
                  alt="OpenWeed Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">OpenWeed Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-brand-green text-brand-ink'
                      : 'hover:bg-brand-paper/10'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-brand-paper/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-brand-ink">A</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-brand-paper/70">admin@openweed.co</p>
              </div>
            </div>
            
            <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-brand-paper/70 hover:text-brand-paper transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            
            <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-brand-paper/70 hover:text-brand-paper transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-brand-ink/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-ink">
              {navigation.find(item => item.href === pathname)?.name || 'Admin'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-brand-ink/70">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
